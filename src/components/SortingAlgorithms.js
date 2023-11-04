import React, { useState } from "react";
import ArrayElement from "./ArrayElement";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);

  // Function to generate a new random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 50; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  // Bubble Sort algorithm
  const bubbleSort = () => {
    const arr = [...array];
    const n = arr.length;

    let animations = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          animations.push([...arr]);
        }
      }
    }
    animateSort(animations, 25);
  };

  const insertionSort = () => {
    const arr = [...array];
    const n = arr.length;

    let animations = [];
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        animations.push([...arr]);
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }
    animateSort(animations, 25);
  };

  const selectionSort = () => {
    const arr = [...array];
    const n = arr.length;

    let animations = [];
    for (let i = n - 1; i > 0; i--) {
      let maxIndex = 0;
      for (let j = 1; j <= i; j++) {
        // Start from 1 and consider all elements in the unsorted part
        if (arr[j] > arr[maxIndex]) {
          maxIndex = j;
        }
      }

      // Swap elements
      let temp = arr[i];
      arr[i] = arr[maxIndex];
      arr[maxIndex] = temp;
      // Record the swap
      animations.push([...arr]);
    }
    animateSort(animations, 200);
  };

  const quickSort = () => {
    const arr = [...array];
    const animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    animateSort(animations, 50);
  };

  const quickSortHelper = (arr, low, high, animations) => {
    if (low < high) {
      const pi = partition(arr, low, high, animations);
      quickSortHelper(arr, low, pi - 1, animations);
      quickSortHelper(arr, pi + 1, high, animations);
    }
  };

  const partition = (arr, low, high, animations) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        // Swap elements
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        // Record the swap
        animations.push([...arr]);
      }
    }

    // Swap elements
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    // Record the swap
    animations.push([...arr]);

    return i + 1;
  };

  const animateSort = (animations, delay) => {
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      setTimeout(() => {
        setArray(animation);
      }, i * delay); // Adjust animation speed
    }
  };

  // Helper function to generate a random integer in a given range
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className="sorting-visualizer">
      <button onClick={generateArray}>Generate New Array</button>
      <button onClick={bubbleSort}>Bubble Sort</button>
      <button onClick={insertionSort}>Insertion Sort</button>
      <button onClick={selectionSort}>Selection Sort</button>
      <button onClick={quickSort}>Quick Sort</button>
      <div className="array-container">
        {array.map((value, index) => (
          <ArrayElement key={index} value={value} />
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;

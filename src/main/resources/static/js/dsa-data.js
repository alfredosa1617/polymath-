// ============================================================================
// Polymath VSN - DSA Curriculum & Interview Question Bank (100 Problems)
// 20 Core Categories matching Striver / LeetCode Structured Roadmaps
// ============================================================================

const DSA_CURRICULUM = [
  {
    id: "beginner-problems",
    title: "1. Beginner Problems",
    description: "Fundamental mathematics, number theory, and logic foundations.",
    questions: [
      {
        id: "palindrome-number",
        title: "Palindrome Number",
        difficulty: "Easy",
        acceptance: "55.4%",
        tags: ["Math", "Beginner"],
        description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.<br>An integer is a palindrome when it reads the same forward and backward.",
        examples: [
          { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
          { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left it becomes 121-." }
        ],
        constraints: ["-2^31 <= x <= 2^31 - 1"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        if (x < 0) return false;\n        long long rev = 0, orig = x;\n        while (x > 0) {\n            rev = rev * 10 + (x % 10);\n            x /= 10;\n        }\n        return rev == orig;\n    }\n};`,
          java: `public boolean isPalindrome(int x) {\n    if (x < 0) return false;\n    long rev = 0, orig = x;\n    while (x > 0) {\n        rev = rev * 10 + (x % 10);\n        x /= 10;\n    }\n    return rev == orig;\n}`,
          python: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        if x < 0:\n            return False\n        s = str(x)\n        return s == s[::-1]`
        }
      },
      {
        id: "reverse-integer",
        title: "Reverse Integer",
        difficulty: "Medium",
        acceptance: "28.3%",
        tags: ["Math"],
        description: "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, return 0.",
        examples: [
          { input: "x = 123", output: "321", explanation: "Reversing digits yields 321." },
          { input: "x = -123", output: "-321", explanation: "Negative sign is preserved." }
        ],
        constraints: ["-2^31 <= x <= 2^31 - 1"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int reverse(int x) {\n        long long res = 0;\n        while (x != 0) {\n            res = res * 10 + (x % 10);\n            x /= 10;\n        }\n        if (res > INT_MAX || res < INT_MIN) return 0;\n        return (int)res;\n    }\n};`,
          java: `public int reverse(int x) {\n    long res = 0;\n    while (x != 0) {\n        res = res * 10 + (x % 10);\n        x /= 10;\n    }\n    if (res > Integer.MAX_VALUE || res < Integer.MIN_VALUE) return 0;\n    return (int) res;\n}`,
          python: `class Solution:\n    def reverse(self, x: int) -> int:\n        sign = -1 if x < 0 else 1\n        rev = int(str(abs(x))[::-1]) * sign\n        return rev if -(2**31) <= rev <= 2**31 - 1 else 0`
        }
      },
      {
        id: "count-digits",
        title: "Count Digits in Integer",
        difficulty: "Easy",
        acceptance: "78.1%",
        tags: ["Math", "Basic"],
        description: "Given a positive integer `n`, count the total number of digits that evenly divide `n`.",
        examples: [
          { input: "n = 12", output: "2", explanation: "1 and 2 both divide 12 evenly." },
          { input: "n = 2446", output: "1", explanation: "Only 2 divides 2446 evenly." }
        ],
        constraints: ["1 <= n <= 10^9"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int countDigits(int n) {\n        int temp = n, count = 0;\n        while (temp > 0) {\n            int digit = temp % 10;\n            if (digit != 0 && n % digit == 0) count++;\n            temp /= 10;\n        }\n        return count;\n    }\n};`,
          java: `public int countDigits(int n) {\n    int temp = n, count = 0;\n    while (temp > 0) {\n        int digit = temp % 10;\n        if (digit != 0 && n % digit == 0) count++;\n        temp /= 10;\n    }\n    return count;\n}`,
          python: `class Solution:\n    def countDigits(self, n: int) -> int:\n        return sum(1 for d in str(n) if int(d) != 0 and n % int(d) == 0)`
        }
      },
      {
        id: "check-prime",
        title: "Check If Prime",
        difficulty: "Easy",
        acceptance: "61.2%",
        tags: ["Math"],
        description: "Given an integer `n`, determine whether `n` is prime in `O(sqrt(n))` time.",
        examples: [
          { input: "n = 29", output: "true", explanation: "29 has no divisors other than 1 and itself." },
          { input: "n = 15", output: "false", explanation: "15 is divisible by 3 and 5." }
        ],
        constraints: ["1 <= n <= 10^9"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool isPrime(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n};`,
          java: `public boolean isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}`,
          python: `class Solution:\n    def isPrime(self, n: int) -> bool:\n        if n <= 1: return False\n        i = 2\n        while i * i <= n:\n            if n % i == 0: return False\n            i += 1\n        return True`
        }
      },
      {
        id: "gcd-euclidean",
        title: "GCD of Two Numbers",
        difficulty: "Easy",
        acceptance: "72.4%",
        tags: ["Math", "Recursion"],
        description: "Compute the Greatest Common Divisor (GCD) of `a` and `b` using the Euclidean algorithm.",
        examples: [
          { input: "a = 48, b = 18", output: "6", explanation: "Common divisors are 1, 2, 3, 6." },
          { input: "a = 101, b = 10", output: "1", explanation: "101 is prime." }
        ],
        constraints: ["1 <= a, b <= 10^9"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int gcd(int a, int b) {\n        while (b != 0) {\n            int temp = b;\n            b = a % b;\n            a = temp;\n        }\n        return a;\n    }\n};`,
          java: `public int gcd(int a, int b) {\n    while (b != 0) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }\n    return a;\n}`,
          python: `class Solution:\n    def gcd(self, a: int, b: int) -> int:\n        while b != 0:\n            a, b = b, a % b\n        return a`
        }
      }
    ]
  },
  {
    id: "sorting",
    title: "2. Sorting",
    description: "Comparison-based and divide-and-conquer sorting implementations.",
    questions: [
      {
        id: "bubble-sort",
        title: "Bubble Sort",
        difficulty: "Easy",
        acceptance: "68.9%",
        tags: ["Sorting"],
        description: "Implement Bubble Sort to sort an array `arr` in ascending order.",
        examples: [
          { input: "arr = [5, 1, 4, 2, 8]", output: "[1, 2, 4, 5, 8]", explanation: "Successive pair swaps bubble maximum to the end." }
        ],
        constraints: ["1 <= arr.length <= 1000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> bubbleSort(vector<int>& arr) {\n        int n = arr.size();\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) swap(arr[j], arr[j + 1]);\n            }\n        }\n        return arr;\n    }\n};`,
          java: `public int[] bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n        }\n    }\n    return arr;\n}`,
          python: `class Solution:\n    def bubbleSort(self, arr: list[int]) -> list[int]:\n        n = len(arr)\n        for i in range(n):\n            for j in range(0, n - i - 1):\n                if arr[j] > arr[j+1]:\n                    arr[j], arr[j+1] = arr[j+1], arr[j]\n        return arr`
        }
      },
      {
        id: "selection-sort",
        title: "Selection Sort",
        difficulty: "Easy",
        acceptance: "66.5%",
        tags: ["Sorting"],
        description: "Sort an array `arr` by repeatedly finding the minimum element from the unsorted sublist.",
        examples: [
          { input: "arr = [64, 25, 12, 22, 11]", output: "[11, 12, 22, 25, 64]", explanation: "11 is selected first, then 12, etc." }
        ],
        constraints: ["1 <= arr.length <= 1000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> selectionSort(vector<int>& arr) {\n        int n = arr.size();\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] < arr[minIdx]) minIdx = j;\n            }\n            swap(arr[i], arr[minIdx]);\n        }\n        return arr;\n    }\n};`,
          java: `public int[] selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;\n    }\n    return arr;\n}`,
          python: `class Solution:\n    def selectionSort(self, arr: list[int]) -> list[int]:\n        n = len(arr)\n        for i in range(n):\n            min_i = i\n            for j in range(i+1, n):\n                if arr[j] < arr[min_i]:\n                    min_i = j\n            arr[i], arr[min_i] = arr[min_i], arr[i]\n        return arr`
        }
      },
      {
        id: "insertion-sort",
        title: "Insertion Sort",
        difficulty: "Easy",
        acceptance: "67.1%",
        tags: ["Sorting"],
        description: "Sort `arr` by iteratively inserting elements into their correct sorted position.",
        examples: [
          { input: "arr = [12, 11, 13, 5, 6]", output: "[5, 6, 11, 12, 13]", explanation: "Efficient for small and nearly sorted arrays." }
        ],
        constraints: ["1 <= arr.length <= 1000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> insertionSort(vector<int>& arr) {\n        int n = arr.size();\n        for (int i = 1; i < n; i++) {\n            int key = arr[i], j = i - 1;\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j--;\n            }\n            arr[j + 1] = key;\n        }\n        return arr;\n    }\n};`,
          java: `public int[] insertionSort(int[] arr) {\n    for (int i = 1; i < arr.length; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j]; j--;\n        }\n        arr[j + 1] = key;\n    }\n    return arr;\n}`,
          python: `class Solution:\n    def insertionSort(self, arr: list[int]) -> list[int]:\n        for i in range(1, len(arr)):\n            key, j = arr[i], i - 1\n            while j >= 0 and arr[j] > key:\n                arr[j + 1] = arr[j]\n                j -= 1\n            arr[j + 1] = key\n        return arr`
        }
      },
      {
        id: "merge-sort",
        title: "Merge Sort",
        difficulty: "Medium",
        acceptance: "63.2%",
        tags: ["Sorting", "Divide and Conquer"],
        description: "Implement `O(N log N)` divide-and-conquer Merge Sort.",
        examples: [
          { input: "arr = [38, 27, 43, 3, 9, 82, 10]", output: "[3, 9, 10, 27, 38, 43, 82]", explanation: "Array is halved recursively and merged in linear time." }
        ],
        constraints: ["1 <= arr.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\n    void merge(vector<int>& arr, int l, int m, int r) {\n        vector<int> left(arr.begin() + l, arr.begin() + m + 1);\n        vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);\n        int i = 0, j = 0, k = l;\n        while (i < left.size() && j < right.size()) {\n            if (left[i] <= right[j]) arr[k++] = left[i++];\n            else arr[k++] = right[j++];\n        }\n        while (i < left.size()) arr[k++] = left[i++];\n        while (j < right.size()) arr[k++] = right[j++];\n    }\n    void sortHelper(vector<int>& arr, int l, int r) {\n        if (l < r) {\n            int m = l + (r - l) / 2;\n            sortHelper(arr, l, m);\n            sortHelper(arr, m + 1, r);\n            merge(arr, l, m, r);\n        }\n    }\npublic:\n    vector<int> mergeSort(vector<int>& arr) {\n        sortHelper(arr, 0, arr.size() - 1);\n        return arr;\n    }\n};`,
          java: `public int[] mergeSort(int[] arr) {\n    Arrays.sort(arr);\n    return arr;\n}`,
          python: `class Solution:\n    def mergeSort(self, arr: list[int]) -> list[int]:\n        arr.sort()\n        return arr`
        }
      },
      {
        id: "quick-sort",
        title: "Quick Sort",
        difficulty: "Medium",
        acceptance: "59.8%",
        tags: ["Sorting", "Divide and Conquer"],
        description: "Implement Quick Sort using Lomuto or Hoare partitioning around a pivot element.",
        examples: [
          { input: "arr = [10, 7, 8, 9, 1, 5]", output: "[1, 5, 7, 8, 9, 10]", explanation: "Average case complexity is O(N log N)." }
        ],
        constraints: ["1 <= arr.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\n    int partition(vector<int>& arr, int low, int high) {\n        int pivot = arr[high], i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) swap(arr[++i], arr[j]);\n        }\n        swap(arr[i + 1], arr[high]);\n        return i + 1;\n    }\n    void quickSortHelper(vector<int>& arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            quickSortHelper(arr, low, pi - 1);\n            quickSortHelper(arr, pi + 1, high);\n        }\n    }\npublic:\n    vector<int> quickSort(vector<int>& arr) {\n        quickSortHelper(arr, 0, arr.size() - 1);\n        return arr;\n    }\n};`,
          java: `public int[] quickSort(int[] arr) {\n    Arrays.sort(arr);\n    return arr;\n}`,
          python: `class Solution:\n    def quickSort(self, arr: list[int]) -> list[int]:\n        arr.sort()\n        return arr`
        }
      }
    ]
  },
  {
    id: "arrays",
    title: "3. Arrays",
    description: "Core linear array algorithms, prefix sums, and two-pointer paradigms.",
    questions: [
      {
        id: "two-sum",
        title: "Two Sum",
        difficulty: "Easy",
        acceptance: "53.2%",
        tags: ["Array", "Hash Table"],
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.<br>You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
          { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
          { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "nums[1] + nums[2] == 6, return [1, 2]." },
          { input: "nums = [3,3], target = 6", output: "[0,1]", explanation: "3 + 3 = 6." }
        ],
        constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (seen.count(comp)) return {seen[comp], i};\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
          java: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int comp = target - nums[i];\n        if (seen.containsKey(comp)) return new int[]{seen.get(comp), i};\n        seen.put(nums[i], i);\n    }\n    return new int[]{};\n}`,
          python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            comp = target - n\n            if comp in seen:\n                return [seen[comp], i]\n            seen[n] = i\n        return []`
        }
      },
      {
        id: "best-time-stock",
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        acceptance: "54.1%",
        tags: ["Array", "Dynamic Programming"],
        description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.<br>You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        examples: [
          { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
          { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No positive profit possible." }
        ],
        constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        int minP = INT_MAX, maxProf = 0;\n        for (int p : prices) {\n            minP = min(minP, p);\n            maxProf = max(maxProf, p - minP);\n        }\n        return maxProf;\n    }\n};`,
          java: `public int maxProfit(int[] prices) {\n    int minP = Integer.MAX_VALUE, maxProf = 0;\n    for (int p : prices) {\n        minP = Math.min(minP, p);\n        maxProf = Math.max(maxProf, p - minP);\n    }\n    return maxProf;\n}`,
          python: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        min_p = float('inf')\n        max_prof = 0\n        for p in prices:\n            min_p = min(min_p, p)\n            max_prof = max(max_prof, p - min_p)\n        return max_prof`
        }
      },
      {
        id: "max-subarray",
        title: "Maximum Subarray (Kadane's)",
        difficulty: "Medium",
        acceptance: "50.8%",
        tags: ["Array", "Dynamic Programming"],
        description: "Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.",
        examples: [
          { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
          { input: "nums = [5,4,-1,7,8]", output: "23", explanation: "Sum of entire array is 23." }
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int cur = 0, maxS = INT_MIN;\n        for (int x : nums) {\n            cur = max(x, cur + x);\n            maxS = max(maxS, cur);\n        }\n        return maxS;\n    }\n};`,
          java: `public int maxSubArray(int[] nums) {\n    int cur = 0, maxS = Integer.MIN_VALUE;\n    for (int x : nums) {\n        cur = Math.max(x, cur + x);\n        maxS = Math.max(maxS, cur);\n    }\n    return maxS;\n}`,
          python: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        cur, max_s = 0, -float('inf')\n        for x in nums:\n            cur = max(x, cur + x)\n            max_s = max(max_s, cur)\n        return max_s`
        }
      },
      {
        id: "three-sum",
        title: "3Sum",
        difficulty: "Medium",
        acceptance: "34.1%",
        tags: ["Array", "Two Pointers", "Sorting"],
        description: "Given an integer array `nums`, return all triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0` without duplicates.",
        examples: [
          { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "Distinct zero-sum triplets." }
        ],
        constraints: ["3 <= nums.length <= 3000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> res;\n        for (int i = 0; i < nums.size(); i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.size() - 1;\n            while (l < r) {\n                int s = nums[i] + nums[l] + nums[r];\n                if (s < 0) l++;\n                else if (s > 0) r--;\n                else {\n                    res.push_back({nums[i], nums[l], nums[r]});\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                }\n            }\n        }\n        return res;\n    }\n};`,
          java: `public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < nums.length; i++) {\n        if (i > 0 && nums[i] == nums[i-1]) continue;\n        int l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            int s = nums[i] + nums[l] + nums[r];\n            if (s < 0) l++;\n            else if (s > 0) r--;\n            else {\n                res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                while (l < r && nums[l] == nums[l+1]) l++;\n                while (l < r && nums[r] == nums[r-1]) r--;\n                l++; r--;\n            }\n        }\n    }\n    return res;\n}`,
          python: `class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums)):\n            if i > 0 and nums[i] == nums[i-1]: continue\n            l, r = i + 1, len(nums) - 1\n            while l < r:\n                s = nums[i] + nums[l] + nums[r]\n                if s < 0: l += 1\n                elif s > 0: r -= 1\n                else:\n                    res.append([nums[i], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l+1]: l += 1\n                    while l < r and nums[r] == nums[r-1]: r -= 1\n                    l += 1; r -= 1\n        return res`
        }
      },
      {
        id: "merge-intervals",
        title: "Merge Intervals",
        difficulty: "Medium",
        acceptance: "47.2%",
        tags: ["Array", "Sorting"],
        description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals.",
        examples: [
          { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap, merging to [1,6]." }
        ],
        constraints: ["1 <= intervals.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> res;\n        for (auto& iv : intervals) {\n            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);\n            else res.back()[1] = max(res.back()[1], iv[1]);\n        }\n        return res;\n    }\n};`,
          java: `public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> res = new ArrayList<>();\n    for (int[] iv : intervals) {\n        if (res.isEmpty() || res.get(res.size()-1)[1] < iv[0]) res.add(iv);\n        else res.get(res.size()-1)[1] = Math.max(res.get(res.size()-1)[1], iv[1]);\n    }\n    return res.toArray(new int[res.size()][]);\n}`,
          python: `class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        intervals.sort(key=lambda x: x[0])\n        merged = []\n        for iv in intervals:\n            if not merged or merged[-1][1] < iv[0]:\n                merged.append(iv)\n            else:\n                merged[-1][1] = max(merged[-1][1], iv[1])\n        return merged`
        }
      }
    ]
  },
  {
    id: "hashing",
    title: "4. Hashing",
    description: "Hash tables, sets, collision handling, and frequency analysis.",
    questions: [
      {
        id: "contains-duplicate",
        title: "Contains Duplicate",
        difficulty: "Easy",
        acceptance: "61.5%",
        tags: ["Array", "Hash Table"],
        description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
        examples: [
          { input: "nums = [1,2,3,1]", output: "true", explanation: "1 appears at index 0 and index 3." },
          { input: "nums = [1,2,3,4]", output: "false", explanation: "All elements are unique." }
        ],
        constraints: ["1 <= nums.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int x : nums) {\n            if (seen.count(x)) return true;\n            seen.insert(x);\n        }\n        return false;\n    }\n};`,
          java: `public boolean containsDuplicate(int[] nums) {\n    Set<Integer> seen = new HashSet<>();\n    for (int x : nums) {\n        if (seen.contains(x)) return true;\n        seen.add(x);\n    }\n    return false;\n}`,
          python: `class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        return len(nums) != len(set(nums))`
        }
      },
      {
        id: "valid-anagram",
        title: "Valid Anagram",
        difficulty: "Easy",
        acceptance: "64.0%",
        tags: ["Hash Table", "String"],
        description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
        examples: [
          { input: "s = 'anagram', t = 'nagaram'", output: "true", explanation: "Both strings share identical letter frequencies." },
          { input: "s = 'rat', t = 'car'", output: "false", explanation: "Frequencies differ." }
        ],
        constraints: ["1 <= s.length, t.length <= 5 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.size() != t.size()) return false;\n        int count[26] = {0};\n        for (char c : s) count[c - 'a']++;\n        for (char c : t) if (--count[c - 'a'] < 0) return false;\n        return true;\n    }\n};`,
          java: `public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    for (char c : t.toCharArray()) if (--count[c - 'a'] < 0) return false;\n    return true;\n}`,
          python: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        from collections import Counter\n        return Counter(s) == Counter(t)`
        }
      },
      {
        id: "group-anagrams",
        title: "Group Anagrams",
        difficulty: "Medium",
        acceptance: "67.8%",
        tags: ["Array", "Hash Table", "String"],
        description: "Given an array of strings `strs`, group the anagrams together in any order.",
        examples: [
          { input: "strs = ['eat','tea','tan','ate','nat','bat']", output: "[['bat'],['nat','tan'],['ate','eat','tea']]", explanation: "Anagram clusters grouped." }
        ],
        constraints: ["1 <= strs.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> mp;\n        for (auto& s : strs) {\n            string key = s;\n            sort(key.begin(), key.end());\n            mp[key].push_back(s);\n        }\n        vector<vector<string>> res;\n        for (auto& p : mp) res.push_back(p.second);\n        return res;\n    }\n};`,
          java: `public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> map = new HashMap<>();\n    for (String s : strs) {\n        char[] ca = s.toCharArray();\n        Arrays.sort(ca);\n        String key = String.valueOf(ca);\n        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n    }\n    return new ArrayList<>(map.values());\n}`,
          python: `class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        from collections import defaultdict\n        mp = defaultdict(list)\n        for s in strs:\n            mp[''.join(sorted(s))].append(s)\n        return list(mp.values())`
        }
      },
      {
        id: "subarray-sum-k",
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        acceptance: "44.2%",
        tags: ["Array", "Hash Table", "Prefix Sum"],
        description: "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.",
        examples: [
          { input: "nums = [1,1,1], k = 2", output: "2", explanation: "[1,1] appears twice." }
        ],
        constraints: ["1 <= nums.length <= 2 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int, int> prefixCounts;\n        prefixCounts[0] = 1;\n        int sum = 0, count = 0;\n        for (int x : nums) {\n            sum += x;\n            if (prefixCounts.count(sum - k)) count += prefixCounts[sum - k];\n            prefixCounts[sum]++;\n        }\n        return count;\n    }\n};`,
          java: `public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int sum = 0, count = 0;\n    for (int x : nums) {\n        sum += x;\n        count += map.getOrDefault(sum - k, 0);\n        map.put(sum, map.getOrDefault(sum, 0) + 1);\n    }\n    return count;\n}`,
          python: `class Solution:\n    def subarraySum(self, nums: list[int], k: int) -> int:\n        from collections import defaultdict\n        mp = defaultdict(int)\n        mp[0] = 1\n        s = 0\n        res = 0\n        for x in nums:\n            s += x\n            res += mp[s - k]\n            mp[s] += 1\n        return res`
        }
      },
      {
        id: "longest-consecutive-seq",
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        acceptance: "48.2%",
        tags: ["Array", "Hash Table", "Union Find"],
        description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in `O(N)` time.",
        examples: [
          { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]." }
        ],
        constraints: ["0 <= nums.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        unordered_set<int> s(nums.begin(), nums.end());\n        int maxLen = 0;\n        for (int x : s) {\n            if (!s.count(x - 1)) {\n                int cur = x, len = 1;\n                while (s.count(cur + 1)) { cur++; len++; }\n                maxLen = max(maxLen, len);\n            }\n        }\n        return maxLen;\n    }\n};`,
          java: `public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int x : nums) set.add(x);\n    int maxLen = 0;\n    for (int x : set) {\n        if (!set.contains(x - 1)) {\n            int cur = x, len = 1;\n            while (set.contains(cur + 1)) { cur++; len++; }\n            maxLen = Math.max(maxLen, len);\n        }\n    }\n    return maxLen;\n}`,
          python: `class Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        s = set(nums)\n        max_len = 0\n        for x in s:\n            if x - 1 not in s:\n                cur = x\n                cur_len = 1\n                while cur + 1 in s:\n                    cur += 1\n                    cur_len += 1\n                max_len = max(max_len, cur_len)\n        return max_len`
        }
      }
    ]
  },
  {
    id: "binary-search",
    title: "5. Binary Search",
    description: "Logarithmic search on monotonic spaces, rotated arrays, and answer predicates.",
    questions: [
      {
        id: "binary-search",
        title: "Binary Search",
        difficulty: "Easy",
        acceptance: "57.3%",
        tags: ["Binary Search", "Array"],
        description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return -1.",
        examples: [
          { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
          { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums." }
        ],
        constraints: ["1 <= nums.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n};`,
          java: `public int search(int[] nums, int target) {\n    int l = 0, r = nums.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`,
          python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target: return m\n            elif nums[m] < target: l = m + 1\n            else: r = m - 1\n        return -1`
        }
      },
      {
        id: "search-rotated-array",
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        acceptance: "40.2%",
        tags: ["Binary Search", "Array"],
        description: "Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums` in `O(log n)` time.",
        examples: [
          { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "Target found at index 4." }
        ],
        constraints: ["1 <= nums.length <= 5000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int l = 0, r = nums.size() - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[l] <= nums[m]) {\n                if (nums[l] <= target && target < nums[m]) r = m - 1;\n                else l = m + 1;\n            } else {\n                if (nums[m] < target && target <= nums[r]) l = m + 1;\n                else r = m - 1;\n            }\n        }\n        return -1;\n    }\n};`,
          java: `public int search(int[] nums, int target) {\n    int l = 0, r = nums.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[l] <= nums[m]) {\n            if (nums[l] <= target && target < nums[m]) r = m - 1;\n            else l = m + 1;\n        } else {\n            if (nums[m] < target && target <= nums[r]) l = m + 1;\n            else r = m - 1;\n        }\n    }\n    return -1;\n}`,
          python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        l, r = 0, len(nums) - 1\n        while l <= r:\n            m = (l + r) // 2\n            if nums[m] == target: return m\n            if nums[l] <= nums[m]:\n                if nums[l] <= target < nums[m]: r = m - 1\n                else: l = m + 1\n            else:\n                if nums[m] < target <= nums[r]: l = m + 1\n                else: r = m - 1\n        return -1`
        }
      },
      {
        id: "find-min-rotated-array",
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        acceptance: "49.6%",
        tags: ["Binary Search"],
        description: "Given the sorted rotated array `nums` of unique elements, return the minimum element of this array in `O(log n)` time.",
        examples: [
          { input: "nums = [3,4,5,1,2]", output: "1", explanation: "Original array was [1,2,3,4,5] rotated 3 times." }
        ],
        constraints: ["1 <= nums.length <= 5000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        int l = 0, r = nums.size() - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] > nums[r]) l = m + 1;\n            else r = m;\n        }\n        return nums[l];\n    }\n};`,
          java: `public int findMin(int[] nums) {\n    int l = 0, r = nums.length - 1;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] > nums[r]) l = m + 1;\n        else r = m;\n    }\n    return nums[l];\n}`,
          python: `class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        l, r = 0, len(nums) - 1\n        while l < r:\n            m = (l + r) // 2\n            if nums[m] > nums[r]: l = m + 1\n            else: r = m\n        return nums[l]`
        }
      },
      {
        id: "first-last-position",
        title: "Find First and Last Position in Sorted Array",
        difficulty: "Medium",
        acceptance: "43.5%",
        tags: ["Binary Search"],
        description: "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.",
        examples: [
          { input: "nums = [5,7,7,8,8,10], target = 8", output: "[3,4]", explanation: "Target spans index 3 to 4." }
        ],
        constraints: ["0 <= nums.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\n    int findBound(vector<int>& nums, int target, bool isFirst) {\n        int l = 0, r = nums.size() - 1, ans = -1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) {\n                ans = m;\n                if (isFirst) r = m - 1;\n                else l = m + 1;\n            } else if (nums[m] < target) l = m + 1;\n            else r = m - 1;\n        }\n        return ans;\n    }\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        return {findBound(nums, target, true), findBound(nums, target, false)};\n    }\n};`,
          java: `public int[] searchRange(int[] nums, int target) {\n    return new int[]{-1, -1};\n}`,
          python: `class Solution:\n    def searchRange(self, nums: list[int], target: int) -> list[int]:\n        import bisect\n        l = bisect.bisect_left(nums, target)\n        r = bisect.bisect_right(nums, target) - 1\n        return [l, r] if l <= r and l < len(nums) and nums[l] == target else [-1, -1]`
        }
      },
      {
        id: "koko-eating-bananas",
        title: "Koko Eating Bananas",
        difficulty: "Medium",
        acceptance: "51.8%",
        tags: ["Binary Search"],
        description: "Given `piles` of bananas and `h` hours, return the minimum integer `k` such that Koko can eat all bananas within `h` hours.",
        examples: [
          { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "At speed 4, total hours = 1 + 2 + 2 + 3 = 8." }
        ],
        constraints: ["1 <= piles.length <= 10^4", "piles.length <= h <= 10^9"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        long long l = 1, r = *max_element(piles.begin(), piles.end());\n        while (l < r) {\n            long long m = l + (r - l) / 2;\n            long long hours = 0;\n            for (int p : piles) hours += (p + m - 1) / m;\n            if (hours <= h) r = m;\n            else l = m + 1;\n        }\n        return l;\n    }\n};`,
          java: `public int minEatingSpeed(int[] piles, int h) {\n    int l = 1, r = 1000000000;\n    while (l < r) {\n        int m = l + (r - l) / 2, hours = 0;\n        for (int p : piles) hours += (p + m - 1) / m;\n        if (hours <= h) r = m;\n        else l = m + 1;\n    }\n    return l;\n}`,
          python: `class Solution:\n    def minEatingSpeed(self, piles: list[int], h: int) -> int:\n        l, r = 1, max(piles)\n        while l < r:\n            m = (l + r) // 2\n            if sum((p + m - 1) // m for p in piles) <= h: r = m\n            else: l = m + 1\n        return l`
        }
      }
    ]
  },
  {
    id: "strings-basic-medium",
    title: "6. Strings (Basic and Medium)",
    description: "String parsing, tokenization, palindromes, and state machine parsing.",
    questions: [
      {
        id: "valid-palindrome",
        title: "Valid Palindrome",
        difficulty: "Easy",
        acceptance: "46.2%",
        tags: ["Two Pointers", "String"],
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        examples: [
          { input: "s = 'A man, a plan, a canal: Panama'", output: "true", explanation: "'amanaplanacanalpanama' is a palindrome." },
          { input: "s = 'race a car'", output: "false", explanation: "'raceacar' is not a palindrome." }
        ],
        constraints: ["1 <= s.length <= 2 * 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) {\n            while (l < r && !isalnum(s[l])) l++;\n            while (l < r && !isalnum(s[r])) r--;\n            if (tolower(s[l]) != tolower(s[r])) return false;\n            l++; r--;\n        }\n        return true;\n    }\n};`,
          java: `public boolean isPalindrome(String s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n        l++; r--;\n    }\n    return true;\n}`,
          python: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        clean = [c.lower() for c in s if c.isalnum()]\n        return clean == clean[::-1]`
        }
      },
      {
        id: "longest-common-prefix",
        title: "Longest Common Prefix",
        difficulty: "Easy",
        acceptance: "42.5%",
        tags: ["String", "Trie"],
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `\"\"`.",
        examples: [
          { input: "strs = ['flower','flow','flight']", output: "'fl'", explanation: "Prefix common to all words." }
        ],
        constraints: ["1 <= strs.length <= 200"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        if (strs.empty()) return "";\n        string prefix = strs[0];\n        for (int i = 1; i < strs.size(); i++) {\n            while (strs[i].find(prefix) != 0) {\n                prefix = prefix.substr(0, prefix.size() - 1);\n                if (prefix.empty()) return "";\n            }\n        }\n        return prefix;\n    }\n};`,
          java: `public String longestCommonPrefix(String[] strs) {\n    if (strs == null || strs.length == 0) return "";\n    String p = strs[0];\n    for (int i = 1; i < strs.length; i++) {\n        while (strs[i].indexOf(p) != 0) {\n            p = p.substring(0, p.length() - 1);\n            if (p.isEmpty()) return "";\n        }\n    }\n    return p;\n}`,
          python: `class Solution:\n    def longestCommonPrefix(self, strs: list[str]) -> str:\n        if not strs: return ""\n        import os\n        return os.path.commonprefix(strs)`
        }
      },
      {
        id: "string-to-integer-atoi",
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        acceptance: "17.4%",
        tags: ["String"],
        description: "Implement `myAtoi(string s)` which converts a string to a 32-bit signed integer honoring whitespace, signs, and 32-bit limits.",
        examples: [
          { input: "s = '   -42'", output: "-42", explanation: "Leading whitespace ignored, sign parsed." }
        ],
        constraints: ["0 <= s.length <= 200"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int myAtoi(string s) {\n        int i = 0, n = s.size(), sign = 1;\n        long res = 0;\n        while (i < n && s[i] == ' ') i++;\n        if (i < n && (s[i] == '+' || s[i] == '-')) {\n            sign = (s[i] == '-') ? -1 : 1;\n            i++;\n        }\n        while (i < n && isdigit(s[i])) {\n            res = res * 10 + (s[i] - '0');\n            if (res * sign > INT_MAX) return INT_MAX;\n            if (res * sign < INT_MIN) return INT_MIN;\n            i++;\n        }\n        return res * sign;\n    }\n};`,
          java: `public int myAtoi(String s) {\n    return 0;\n}`,
          python: `class Solution:\n    def myAtoi(self, s: str) -> int:\n        s = s.strip()\n        if not s: return 0\n        sign = -1 if s[0] == '-' else 1\n        if s[0] in ['+', '-']: s = s[1:]\n        res = 0\n        for c in s:\n            if not c.isdigit(): break\n            res = res * 10 + int(c)\n        res *= sign\n        return max(-2**31, min(2**31 - 1, res))`
        }
      },
      {
        id: "roman-to-integer",
        title: "Roman to Integer",
        difficulty: "Easy",
        acceptance: "60.4%",
        tags: ["Hash Table", "Math", "String"],
        description: "Given a roman numeral `s`, convert it to an integer.",
        examples: [
          { input: "s = 'LVIII'", output: "58", explanation: "L = 50, V = 5, III = 3." }
        ],
        constraints: ["1 <= s.length <= 15"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int romanToInt(string s) {\n        unordered_map<char, int> val = {{'I', 1}, {'V', 5}, {'X', 10}, {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}};\n        int total = 0;\n        for (int i = 0; i < s.size(); i++) {\n            if (i + 1 < s.size() && val[s[i]] < val[s[i + 1]]) total -= val[s[i]];\n            else total += val[s[i]];\n        }\n        return total;\n    }\n};`,
          java: `public int romanToInt(String s) {\n    return 0;\n}`,
          python: `class Solution:\n    def romanToInt(self, s: str) -> int:\n        val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n        total = 0\n        for i in range(len(s)):\n            if i + 1 < len(s) and val[s[i]] < val[s[i+1]]: total -= val[s[i]]\n            else: total += val[s[i]]\n        return total`
        }
      },
      {
        id: "reverse-words-string",
        title: "Reverse Words in a String",
        difficulty: "Medium",
        acceptance: "41.6%",
        tags: ["Two Pointers", "String"],
        description: "Given an input string `s`, reverse the order of the words concatenated by a single space.",
        examples: [
          { input: "s = 'the sky is blue'", output: "'blue is sky the'", explanation: "Words reversed." }
        ],
        constraints: ["1 <= s.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    string reverseWords(string s) {\n        stringstream ss(s);\n        string word, res = "";\n        vector<string> words;\n        while (ss >> word) words.push_back(word);\n        for (int i = words.size() - 1; i >= 0; i--) {\n            res += words[i] + (i > 0 ? " " : "");\n        }\n        return res;\n    }\n};`,
          java: `public String reverseWords(String s) {\n    String[] parts = s.trim().split("\\\\s+");\n    Collections.reverse(Arrays.asList(parts));\n    return String.join(" ", parts);\n}`,
          python: `class Solution:\n    def reverseWords(self, s: str) -> str:\n        return " ".join(s.split()[::-1])`
        }
      }
    ]
  },
  {
    id: "recursion",
    title: "7. Recursion",
    description: "Backtracking, recursion trees, and combinatorial state generation.",
    questions: [
      {
        id: "fibonacci-number",
        title: "Fibonacci Number",
        difficulty: "Easy",
        acceptance: "71.2%",
        tags: ["Recursion", "Math"],
        description: "The Fibonacci numbers satisfy `F(0) = 0, F(1) = 1`, and `F(n) = F(n - 1) + F(n - 2)`. Compute `F(n)`.",
        examples: [{ input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." }],
        constraints: ["0 <= n <= 30"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int fib(int n) {\n        if (n <= 1) return n;\n        int a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};`,
          java: `public int fib(int n) {\n    if (n <= 1) return n;\n    int a = 0, b = 1;\n    for (int i = 2; i <= n; i++) { int c = a + b; a = b; b = c; }\n    return b;\n}`,
          python: `class Solution:\n    def fib(self, n: int) -> int:\n        if n <= 1: return n\n        a, b = 0, 1\n        for _ in range(2, n + 1): a, b = b, a + b\n        return b`
        }
      },
      {
        id: "powx-n",
        title: "Pow(x, n) - Fast Exponentiation",
        difficulty: "Medium",
        acceptance: "34.8%",
        tags: ["Math", "Recursion"],
        description: "Implement `myPow(x, n)` which calculates `x` raised to the power `n` in `O(log n)` time.",
        examples: [{ input: "x = 2.00000, n = 10", output: "1024.00000", explanation: "Binary exponentiation." }],
        constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31 - 1"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    double myPow(double x, int n) {\n        long long exp = n;\n        if (exp < 0) { x = 1.0 / x; exp = -exp; }\n        double res = 1.0;\n        while (exp > 0) {\n            if (exp & 1) res *= x;\n            x *= x;\n            exp >>= 1;\n        }\n        return res;\n    }\n};`,
          java: `public double myPow(double x, int n) {\n    return Math.pow(x, n);\n}`,
          python: `class Solution:\n    def myPow(self, x: float, n: int) -> float:\n        return x ** n`
        }
      },
      {
        id: "generate-parentheses",
        title: "Generate Parentheses",
        difficulty: "Medium",
        acceptance: "74.1%",
        tags: ["Backtracking", "String"],
        description: "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        examples: [{ input: "n = 3", output: "['((()))','(()())','(())()','()(())','()()()']", explanation: "All 5 valid formations." }],
        constraints: ["1 <= n <= 8"],
        starterCode: {
          cpp: `class Solution {\n    void backtrack(vector<string>& res, string cur, int open, int close, int maxP) {\n        if (cur.size() == maxP * 2) { res.push_back(cur); return; }\n        if (open < maxP) backtrack(res, cur + "(", open + 1, close, maxP);\n        if (close < open) backtrack(res, cur + ")", open, close + 1, maxP);\n    }\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> res;\n        backtrack(res, "", 0, 0, n);\n        return res;\n    }\n};`,
          java: `public List<String> generateParenthesis(int n) {\n    return new ArrayList<>();\n}`,
          python: `class Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        res = []\n        def dfs(cur, o, c):\n            if len(cur) == 2 * n: res.append(cur); return\n            if o < n: dfs(cur + '(', o + 1, c)\n            if c < o: dfs(cur + ')', o, c + 1)\n        dfs('', 0, 0)\n        return res`
        }
      },
      {
        id: "subsets",
        title: "Subsets (Power Set)",
        difficulty: "Medium",
        acceptance: "77.5%",
        tags: ["Backtracking", "Bit Manipulation"],
        description: "Given an integer array `nums` of unique elements, return all possible subsets (the power set).",
        examples: [{ input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "2^N subsets." }],
        constraints: ["1 <= nums.length <= 10"],
        starterCode: {
          cpp: `class Solution {\n    void backtrack(vector<vector<int>>& res, vector<int>& cur, vector<int>& nums, int start) {\n        res.push_back(cur);\n        for (int i = start; i < nums.size(); i++) {\n            cur.push_back(nums[i]);\n            backtrack(res, cur, nums, i + 1);\n            cur.pop_back();\n        }\n    }\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        vector<vector<int>> res;\n        vector<int> cur;\n        backtrack(res, cur, nums, 0);\n        return res;\n    }\n};`,
          java: `public List<List<Integer>> subsets(int[] nums) {\n    return new ArrayList<>();\n}`,
          python: `class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        res = [[]]\n        for x in nums:\n            res += [sub + [x] for sub in res]\n        return res`
        }
      },
      {
        id: "permutations",
        title: "Permutations",
        difficulty: "Medium",
        acceptance: "78.0%",
        tags: ["Backtracking"],
        description: "Given an array `nums` of distinct integers, return all the possible permutations.",
        examples: [{ input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "N! permutations." }],
        constraints: ["1 <= nums.length <= 6"],
        starterCode: {
          cpp: `class Solution {\n    void permuteHelper(vector<vector<int>>& res, vector<int>& nums, int start) {\n        if (start == nums.size()) { res.push_back(nums); return; }\n        for (int i = start; i < nums.size(); i++) {\n            swap(nums[start], nums[i]);\n            permuteHelper(res, nums, start + 1);\n            swap(nums[start], nums[i]);\n        }\n    }\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        vector<vector<int>> res;\n        permuteHelper(res, nums, 0);\n        return res;\n    }\n};`,
          java: `public List<List<Integer>> permute(int[] nums) {\n    return new ArrayList<>();\n}`,
          python: `class Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        import itertools\n        return [list(p) for p in itertools.permutations(nums)]`
        }
      }
    ]
  },
  {
    id: "linked-list",
    title: "8. Linked-List",
    description: "Singly and doubly linked lists, reversal, cycle detection, and merging.",
    questions: [
      {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Easy",
        acceptance: "75.4%",
        tags: ["Linked List", "Recursion"],
        description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
        examples: [{ input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "Pointers inverted iteratively." }],
        constraints: ["0 <= number of nodes <= 5000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* nxt = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n};`,
          java: `public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode nxt = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}`,
          python: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev = None\n        curr = head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev`
        }
      },
      {
        id: "merge-two-sorted-lists",
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        acceptance: "63.8%",
        tags: ["Linked List", "Recursion"],
        description: "Merge two sorted linked lists and return it as a sorted list by splicing nodes.",
        examples: [{ input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "Merged in order." }],
        constraints: ["0 <= number of nodes in both lists <= 50"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (list1 && list2) {\n            if (list1->val <= list2->val) { tail->next = list1; list1 = list1->next; }\n            else { tail->next = list2; list2 = list2->next; }\n            tail = tail->next;\n        }\n        tail->next = list1 ? list1 : list2;\n        return dummy.next;\n    }\n};`,
          java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    ListNode dummy = new ListNode(0), tail = dummy;\n    while (list1 != null && list2 != null) {\n        if (list1.val <= list2.val) { tail.next = list1; list1 = list1.next; }\n        else { tail.next = list2; list2 = list2.next; }\n        tail = tail.next;\n    }\n    tail.next = (list1 != null) ? list1 : list2;\n    return dummy.next;\n}`,
          python: `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode(0)\n        tail = dummy\n        while list1 and list2:\n            if list1.val <= list2.val: tail.next = list1; list1 = list1.next\n            else: tail.next = list2; list2 = list2.next\n            tail = tail.next\n        tail.next = list1 or list2\n        return dummy.next`
        }
      },
      {
        id: "linked-list-cycle",
        title: "Linked List Cycle (Floyd's)",
        difficulty: "Easy",
        acceptance: "49.5%",
        tags: ["Hash Table", "Linked List", "Two Pointers"],
        description: "Given `head`, the head of a linked list, determine if the linked list has a cycle using Floyd's Tortoise and Hare algorithm.",
        examples: [{ input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "Tail connects to node index 1." }],
        constraints: ["0 <= number of nodes <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n};`,
          java: `public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next; fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}`,
          python: `class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            if slow == fast: return True\n        return False`
        }
      },
      {
        id: "remove-nth-from-end",
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        acceptance: "45.0%",
        tags: ["Linked List", "Two Pointers"],
        description: "Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head in one pass.",
        examples: [{ input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]", explanation: "Node 4 removed." }],
        constraints: ["1 <= n <= 30"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0, head);\n        ListNode *fast = &dummy, *slow = &dummy;\n        for (int i = 0; i <= n; i++) fast = fast->next;\n        while (fast) {\n            fast = fast->next;\n            slow = slow->next;\n        }\n        slow->next = slow->next->next;\n        return dummy.next;\n    }\n};`,
          java: `public ListNode removeNthFromEnd(ListNode head, int n) {\n    return head;\n}`,
          python: `class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        f = s = dummy\n        for _ in range(n + 1): f = f.next\n        while f:\n            f = f.next\n            s = s.next\n        s.next = s.next.next\n        return dummy.next`
        }
      },
      {
        id: "middle-of-linked-list",
        title: "Middle of the Linked List",
        difficulty: "Easy",
        acceptance: "77.8%",
        tags: ["Linked List", "Two Pointers"],
        description: "Given the `head` of a singly linked list, return the middle node. If there are two middle nodes, return the second middle node.",
        examples: [{ input: "head = [1,2,3,4,5]", output: "[3,4,5]", explanation: "Node 3 is middle." }],
        constraints: ["1 <= nodes <= 100"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        ListNode *slow = head, *fast = head;\n        while (fast && fast->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        return slow;\n    }\n};`,
          java: `public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next; fast = fast.next.next;\n    }\n    return slow;\n}`,
          python: `class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        s = f = head\n        while f and f.next:\n            s = s.next; f = f.next.next\n        return s`
        }
      }
    ]
  },
  {
    id: "bit-manipulation",
    title: "9. Bit Manipulation",
    description: "Binary masks, bitwise operations, XOR tricks, and fast integer logic.",
    questions: [
      {
        id: "single-number",
        title: "Single Number",
        difficulty: "Easy",
        acceptance: "72.4%",
        tags: ["Bit Manipulation", "Array"],
        description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one in linear time and constant space using XOR.",
        examples: [{ input: "nums = [4,1,2,1,2]", output: "4", explanation: "XOR cancellations leave 4." }],
        constraints: ["1 <= nums.length <= 3 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int res = 0;\n        for (int x : nums) res ^= x;\n        return res;\n    }\n};`,
          java: `public int singleNumber(int[] nums) {\n    int res = 0;\n    for (int x : nums) res ^= x;\n    return res;\n}`,
          python: `class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        res = 0\n        for x in nums: res ^= x\n        return res`
        }
      },
      {
        id: "number-of-1-bits",
        title: "Number of 1 Bits (Hamming Weight)",
        difficulty: "Easy",
        acceptance: "70.1%",
        tags: ["Bit Manipulation"],
        description: "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
        examples: [{ input: "n = 11 (binary 1011)", output: "3", explanation: "Three bits set." }],
        constraints: ["1 <= n <= 2^31 - 1"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int hammingWeight(uint32_t n) {\n        int count = 0;\n        while (n) {\n            n &= (n - 1);\n            count++;\n        }\n        return count;\n    }\n};`,
          java: `public int hammingWeight(int n) {\n    return Integer.bitCount(n);\n}`,
          python: `class Solution:\n    def hammingWeight(self, n: int) -> int:\n        return bin(n).count('1')`
        }
      },
      {
        id: "counting-bits",
        title: "Counting Bits",
        difficulty: "Easy",
        acceptance: "77.9%",
        tags: ["Dynamic Programming", "Bit Manipulation"],
        description: "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of 1's in the binary representation of `i`.",
        examples: [{ input: "n = 5", output: "[0,1,1,2,1,2]", explanation: "Calculated in O(N) using ans[i] = ans[i >> 1] + (i & 1)." }],
        constraints: ["0 <= n <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> countBits(int n) {\n        vector<int> ans(n + 1, 0);\n        for (int i = 1; i <= n; i++) {\n            ans[i] = ans[i >> 1] + (i & 1);\n        }\n        return ans;\n    }\n};`,
          java: `public int[] countBits(int n) {\n    int[] ans = new int[n + 1];\n    for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);\n    return ans;\n}`,
          python: `class Solution:\n    def countBits(self, n: int) -> list[int]:\n        ans = [0] * (n + 1)\n        for i in range(1, n + 1): ans[i] = ans[i >> 1] + (i & 1)\n        return ans`
        }
      },
      {
        id: "missing-number",
        title: "Missing Number",
        difficulty: "Easy",
        acceptance: "65.3%",
        tags: ["Array", "Hash Table", "Bit Manipulation"],
        description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
        examples: [{ input: "nums = [3,0,1]", output: "2", explanation: "Range is [0,3], missing 2." }],
        constraints: ["1 <= n <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        int res = nums.size();\n        for (int i = 0; i < nums.size(); i++) res ^= i ^ nums[i];\n        return res;\n    }\n};`,
          java: `public int missingNumber(int[] nums) {\n    int res = nums.length;\n    for (int i = 0; i < nums.length; i++) res ^= i ^ nums[i];\n    return res;\n}`,
          python: `class Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        n = len(nums)\n        return n * (n + 1) // 2 - sum(nums)`
        }
      },
      {
        id: "reverse-bits",
        title: "Reverse Bits",
        difficulty: "Easy",
        acceptance: "59.2%",
        tags: ["Bit Manipulation"],
        description: "Reverse bits of a given 32 bits unsigned integer.",
        examples: [{ input: "n = 43261596 (binary 00000010100101000001111010011100)", output: "964176192", explanation: "Bit position mirror." }],
        constraints: ["The input must be a binary string of length 32"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        uint32_t res = 0;\n        for (int i = 0; i < 32; i++) {\n            res = (res << 1) | (n & 1);\n            n >>= 1;\n        }\n        return res;\n    }\n};`,
          java: `public int reverseBits(int n) {\n    return Integer.reverse(n);\n}`,
          python: `class Solution:\n    def reverseBits(self, n: int) -> int:\n        res = 0\n        for _ in range(32):\n            res = (res << 1) | (n & 1)\n            n >>= 1\n        return res`
        }
      }
    ]
  },
  {
    id: "greedy-algorithms",
    title: "10. Greedy Algorithms",
    description: "Locally optimal choice heuristics leading to global optimization.",
    questions: [
      {
        id: "jump-game",
        title: "Jump Game",
        difficulty: "Medium",
        acceptance: "39.0%",
        tags: ["Greedy", "Dynamic Programming"],
        description: "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index.",
        examples: [{ input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." }],
        constraints: ["1 <= nums.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int maxReach = 0;\n        for (int i = 0; i < nums.size(); i++) {\n            if (i > maxReach) return false;\n            maxReach = max(maxReach, i + nums[i]);\n        }\n        return true;\n    }\n};`,
          java: `public boolean canJump(int[] nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (i > maxReach) return false;\n        maxReach = Math.max(maxReach, i + nums[i]);\n    }\n    return true;\n}`,
          python: `class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        reach = 0\n        for i, x in enumerate(nums):\n            if i > reach: return False\n            reach = max(reach, i + x)\n        return True`
        }
      },
      {
        id: "gas-station",
        title: "Gas Station (Circular Tour)",
        difficulty: "Medium",
        acceptance: "45.7%",
        tags: ["Greedy", "Array"],
        description: "Given two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
        examples: [{ input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3", explanation: "Start at index 3 with gas 4." }],
        constraints: ["1 <= gas.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        int total = 0, tank = 0, start = 0;\n        for (int i = 0; i < gas.size(); i++) {\n            int diff = gas[i] - cost[i];\n            total += diff;\n            tank += diff;\n            if (tank < 0) { start = i + 1; tank = 0; }\n        }\n        return total >= 0 ? start : -1;\n    }\n};`,
          java: `public int canCompleteCircuit(int[] gas, int[] cost) {\n    int total = 0, tank = 0, start = 0;\n    for (int i = 0; i < gas.length; i++) {\n        int diff = gas[i] - cost[i];\n        total += diff; tank += diff;\n        if (tank < 0) { start = i + 1; tank = 0; }\n    }\n    return total >= 0 ? start : -1;\n}`,
          python: `class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        if sum(gas) < sum(cost): return -1\n        tank = start = 0\n        for i in range(len(gas)):\n            tank += gas[i] - cost[i]\n            if tank < 0: start = i + 1; tank = 0\n        return start`
        }
      },
      {
        id: "assign-cookies",
        title: "Assign Cookies",
        difficulty: "Easy",
        acceptance: "52.3%",
        tags: ["Greedy", "Sorting"],
        description: "Assume you are an awesome parent and want to give your children some cookies. Each child `i` has a greed factor `g[i]`, and each cookie `j` has size `s[j]`. Maximize content children.",
        examples: [{ input: "g = [1,2,3], s = [1,1]", output: "1", explanation: "Only 1 child can be content." }],
        constraints: ["1 <= g.length, s.length <= 3 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int findContentChildren(vector<int>& g, vector<int>& s) {\n        sort(g.begin(), g.end());\n        sort(s.begin(), s.end());\n        int i = 0, j = 0;\n        while (i < g.size() && j < s.size()) {\n            if (s[j] >= g[i]) i++;\n            j++;\n        }\n        return i;\n    }\n};`,
          java: `public int findContentChildren(int[] g, int[] s) {\n    Arrays.sort(g); Arrays.sort(s);\n    int i = 0, j = 0;\n    while (i < g.length && j < s.length) { if (s[j] >= g[i]) i++; j++; }\n    return i;\n}`,
          python: `class Solution:\n    def findContentChildren(self, g: list[int], s: list[int]) -> int:\n        g.sort(); s.sort()\n        i = j = 0\n        while i < len(g) and j < len(s):\n            if s[j] >= g[i]: i += 1\n            j += 1\n        return i`
        }
      },
      {
        id: "non-overlapping-intervals",
        title: "Non-overlapping Intervals",
        difficulty: "Medium",
        acceptance: "52.9%",
        tags: ["Greedy", "Sorting"],
        description: "Given an array of `intervals`, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
        examples: [{ input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3]." }],
        constraints: ["1 <= intervals.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return 0;\n        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {\n            return a[1] < b[1];\n        });\n        int count = 0, end = intervals[0][1];\n        for (int i = 1; i < intervals.size(); i++) {\n            if (intervals[i][0] < end) count++;\n            else end = intervals[i][1];\n        }\n        return count;\n    }\n};`,
          java: `public int eraseOverlapIntervals(int[][] intervals) {\n    return 0;\n}`,
          python: `class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        intervals.sort(key=lambda x: x[1])\n        count, end = 0, -float('inf')\n        for iv in intervals:\n            if iv[0] < end: count += 1\n            else: end = iv[1]\n        return count`
        }
      },
      {
        id: "lemonade-change",
        title: "Lemonade Change",
        difficulty: "Easy",
        acceptance: "53.8%",
        tags: ["Greedy"],
        description: "At a lemonade stand, each lemonade costs $5. Customers queue with $5, $10, or $20 bills. Return true if you can provide every customer with correct change.",
        examples: [{ input: "bills = [5,5,5,10,20]", output: "true", explanation: "We collect three $5, then return $5 for $10, and $10 + $5 for $20." }],
        constraints: ["1 <= bills.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool lemonadeChange(vector<int>& bills) {\n        int five = 0, ten = 0;\n        for (int b : bills) {\n            if (b == 5) five++;\n            else if (b == 10) { if (five == 0) return false; five--; ten++; }\n            else {\n                if (ten > 0 && five > 0) { ten--; five--; }\n                else if (five >= 3) five -= 3;\n                else return false;\n            }\n        }\n        return true;\n    }\n};`,
          java: `public boolean lemonadeChange(int[] bills) {\n    return true;\n}`,
          python: `class Solution:\n    def lemonadeChange(self, bills: list[int]) -> bool:\n        five = ten = 0\n        for b in bills:\n            if b == 5: five += 1\n            elif b == 10: five -= 1; ten += 1\n            elif ten > 0: ten -= 1; five -= 1\n            else: five -= 3\n            if five < 0: return False\n        return True`
        }
      }
    ]
  },
  {
    id: "sliding-window-2-pointer",
    title: "11. Sliding Window / 2 Pointer",
    description: "Dynamic and fixed-width window sliding, pointers expansion and contraction.",
    questions: [
      {
        id: "longest-substring-without-repeating",
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        acceptance: "34.5%",
        tags: ["Sliding Window", "Hash Table", "String"],
        description: "Given a string `s`, find the length of the longest substring without duplicate characters.",
        examples: [{ input: "s = 'abcabcbb'", output: "3", explanation: "The answer is 'abc', with length 3." }],
        constraints: ["0 <= s.length <= 5 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_map<char, int> lastIdx;\n        int maxLen = 0, start = 0;\n        for (int i = 0; i < s.size(); i++) {\n            if (lastIdx.count(s[i])) start = max(start, lastIdx[s[i]] + 1);\n            lastIdx[s[i]] = i;\n            maxLen = max(maxLen, i - start + 1);\n        }\n        return maxLen;\n    }\n};`,
          java: `public int lengthOfLongestSubstring(String s) {\n    return 0;\n}`,
          python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        l = res = 0\n        for r, c in enumerate(s):\n            if c in seen and seen[c] >= l: l = seen[c] + 1\n            seen[c] = r\n            res = max(res, r - l + 1)\n        return res`
        }
      },
      {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        acceptance: "54.6%",
        tags: ["Array", "Two Pointers", "Greedy"],
        description: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "Area between height 8 and 7 with width 7." }],
        constraints: ["2 <= height.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int l = 0, r = height.size() - 1, maxA = 0;\n        while (l < r) {\n            int h = min(height[l], height[r]);\n            maxA = max(maxA, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n};`,
          java: `public int maxArea(int[] height) {\n    return 0;\n}`,
          python: `class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        l, r, max_a = 0, len(height) - 1, 0\n        while l < r:\n            max_a = max(max_a, min(height[l], height[r]) * (r - l))\n            if height[l] < height[r]: l += 1\n            else: r -= 1\n        return max_a`
        }
      },
      {
        id: "trapping-rain-water",
        title: "Trapping Rain Water",
        difficulty: "Hard",
        acceptance: "60.5%",
        tags: ["Two Pointers", "Stack", "Dynamic Programming"],
        description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "6 units of rain water trapped." }],
        constraints: ["1 <= height.length <= 2 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        int l = 0, r = height.size() - 1, leftMax = 0, rightMax = 0, water = 0;\n        while (l < r) {\n            if (height[l] < height[r]) {\n                if (height[l] >= leftMax) leftMax = height[l];\n                else water += leftMax - height[l];\n                l++;\n            } else {\n                if (height[r] >= rightMax) rightMax = height[r];\n                else water += rightMax - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n};`,
          java: `public int trap(int[] height) {\n    return 0;\n}`,
          python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        l, r = 0, len(height) - 1\n        l_max = r_max = water = 0\n        while l < r:\n            if height[l] < height[r]:\n                l_max = max(l_max, height[l])\n                water += l_max - height[l]\n                l += 1\n            else:\n                r_max = max(r_max, height[r])\n                water += r_max - height[r]\n                r -= 1\n        return water`
        }
      },
      {
        id: "minimum-window-substring",
        title: "Minimum Window Substring",
        difficulty: "Hard",
        acceptance: "42.0%",
        tags: ["Hash Table", "String", "Sliding Window"],
        description: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.",
        examples: [{ input: "s = 'ADOBECODEBANC', t = 'ABC'", output: "'BANC'", explanation: "Contains A, B, and C." }],
        constraints: ["1 <= s.length, t.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    string minWindow(string s, string t) {\n        vector<int> map(128, 0);\n        for (char c : t) map[c]++;\n        int count = t.size(), begin = 0, end = 0, d = INT_MAX, head = 0;\n        while (end < s.size()) {\n            if (map[s[end++]]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s[begin++]]++ == 0) count++;\n            }\n        }\n        return d == INT_MAX ? "" : s.substr(head, d);\n    }\n};`,
          java: `public String minWindow(String s, String t) {\n    return "";\n}`,
          python: `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        return ""`
        }
      },
      {
        id: "longest-repeating-char-replacement",
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        acceptance: "53.5%",
        tags: ["Hash Table", "String", "Sliding Window"],
        description: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most `k` times. Find the length of the longest substring containing the same letter.",
        examples: [{ input: "s = 'AABABBA', k = 1", output: "4", explanation: "Replace the middle 'A' with 'B' to form 'BBBB' or 'AABA'." }],
        constraints: ["1 <= s.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        vector<int> count(26, 0);\n        int maxCount = 0, l = 0, maxLen = 0;\n        for (int r = 0; r < s.size(); r++) {\n            maxCount = max(maxCount, ++count[s[r] - 'A']);\n            while ((r - l + 1) - maxCount > k) {\n                count[s[l] - 'A']--;\n                l++;\n            }\n            maxLen = max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n};`,
          java: `public int characterReplacement(String s, int k) {\n    return 0;\n}`,
          python: `class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        count = {}\n        l = max_c = res = 0\n        for r, c in enumerate(s):\n            count[c] = count.get(c, 0) + 1\n            max_c = max(max_c, count[c])\n            while (r - l + 1) - max_c > k:\n                count[s[l]] -= 1\n                l += 1\n            res = max(res, r - l + 1)\n        return res`
        }
      }
    ]
  },
  {
    id: "stack-queues",
    title: "12. Stack / Queues",
    description: "LIFO and FIFO data structures, monotonic stacks, and parentheses matching.",
    questions: [
      {
        id: "valid-parentheses",
        title: "Valid Parentheses",
        difficulty: "Easy",
        acceptance: "40.3%",
        tags: ["Stack", "String"],
        description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.",
        examples: [
          { input: "s = '()[]{}'", output: "true", explanation: "All brackets closed in correct order." },
          { input: "s = '(]'", output: "false", explanation: "Mismatched bracket types." }
        ],
        constraints: ["1 <= s.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(') st.push(')');\n            else if (c == '{') st.push('}');\n            else if (c == '[') st.push(']');\n            else if (st.empty() || st.top() != c) return false;\n            else st.pop();\n        }\n        return st.empty();\n    }\n};`,
          java: `public boolean isValid(String s) {\n    Stack<Character> st = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else if (st.isEmpty() || st.pop() != c) return false;\n    }\n    return st.isEmpty();\n}`,
          python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        st = []\n        mp = {')': '(', '}': '{', ']': '['}\n        for c in s:\n            if c in mp:\n                if not st or st.pop() != mp[c]: return False\n            else: st.append(c)\n        return not st`
        }
      },
      {
        id: "min-stack",
        title: "Min Stack",
        difficulty: "Medium",
        acceptance: "53.4%",
        tags: ["Stack", "Design"],
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.",
        examples: [{ input: "push(-2), push(0), push(-3), getMin()", output: "-3", explanation: "Returns current minimum." }],
        constraints: ["Methods called at most 3 * 10^4 times"],
        starterCode: {
          cpp: `class MinStack {\n    stack<int> st;\n    stack<int> minSt;\npublic:\n    MinStack() {}\n    void push(int val) {\n        st.push(val);\n        if (minSt.empty() || val <= minSt.top()) minSt.push(val);\n    }\n    void pop() {\n        if (st.top() == minSt.top()) minSt.pop();\n        st.pop();\n    }\n    int top() { return st.top(); }\n    int getMin() { return minSt.top(); }\n};`,
          java: `class MinStack {\n    public MinStack() {}\n}`,
          python: `class MinStack:\n    def __init__(self):\n        self.st = []\n        self.min_st = []\n    def push(self, val: int) -> None:\n        self.st.append(val)\n        if not self.min_st or val <= self.min_st[-1]: self.min_st.append(val)\n    def pop(self) -> None:\n        if self.st.pop() == self.min_st[-1]: self.min_st.pop()\n    def top(self) -> int: return self.st[-1]\n    def getMin(self) -> int: return self.min_st[-1]`
        }
      },
      {
        id: "daily-temperatures",
        title: "Daily Temperatures (Monotonic Stack)",
        difficulty: "Medium",
        acceptance: "66.0%",
        tags: ["Stack", "Monotonic Stack"],
        description: "Given an array of integers `temperatures`, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature.",
        examples: [{ input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", explanation: "Next warmer index offset." }],
        constraints: ["1 <= temperatures.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        int n = temperatures.size();\n        vector<int> res(n, 0);\n        stack<int> st;\n        for (int i = 0; i < n; i++) {\n            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n                int prev = st.top(); st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n};`,
          java: `public int[] dailyTemperatures(int[] temperatures) {\n    return new int[temperatures.length];\n}`,
          python: `class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        res = [0] * len(temperatures)\n        st = []\n        for i, t in enumerate(temperatures):\n            while st and t > temperatures[st[-1]]:\n                prev = st.pop()\n                res[prev] = i - prev\n            st.append(i)\n        return res`
        }
      },
      {
        id: "eval-rpn",
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        acceptance: "48.9%",
        tags: ["Stack", "Math"],
        description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix).",
        examples: [{ input: "tokens = ['2','1','+','3','*']", output: "9", explanation: "((2 + 1) * 3) = 9." }],
        constraints: ["1 <= tokens.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        stack<int> st;\n        for (auto& t : tokens) {\n            if (t == "+" || t == "-" || t == "*" || t == "/") {\n                int b = st.top(); st.pop();\n                int a = st.top(); st.pop();\n                if (t == "+") st.push(a + b);\n                else if (t == "-") st.push(a - b);\n                else if (t == "*") st.push(a * b);\n                else st.push(a / b);\n            } else st.push(stoi(t));\n        }\n        return st.top();\n    }\n};`,
          java: `public int evalRPN(String[] tokens) {\n    return 0;\n}`,
          python: `class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        st = []\n        for t in tokens:\n            if t in "+-*/":\n                b, a = st.pop(), st.pop()\n                if t == '+': st.append(a + b)\n                elif t == '-': st.append(a - b)\n                elif t == '*': st.append(a * b)\n                else: st.append(int(a / b))\n            else: st.append(int(t))\n        return st[0]`
        }
      },
      {
        id: "implement-queue-using-stacks",
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        acceptance: "64.8%",
        tags: ["Stack", "Design", "Queue"],
        description: "Implement a first in first out (FIFO) queue using only two stacks.",
        examples: [{ input: "push(1), push(2), peek(), pop()", output: "1", explanation: "Returns first element pushed." }],
        constraints: ["At most 100 calls made to push, pop, peek, empty."],
        starterCode: {
          cpp: `class MyQueue {\n    stack<int> inSt, outSt;\n    void shift() {\n        if (outSt.empty()) {\n            while (!inSt.empty()) {\n                outSt.push(inSt.top()); inSt.pop();\n            }\n        }\n    }\npublic:\n    MyQueue() {}\n    void push(int x) { inSt.push(x); }\n    int pop() { shift(); int v = outSt.top(); outSt.pop(); return v; }\n    int peek() { shift(); return outSt.top(); }\n    bool empty() { return inSt.empty() && outSt.empty(); }\n};`,
          java: `class MyQueue {\n    public MyQueue() {}\n}`,
          python: `class MyQueue:\n    def __init__(self):\n        self.in_st, self.out_st = [], []\n    def push(self, x: int) -> None: self.in_st.append(x)\n    def pop(self) -> int:\n        self.peek()\n        return self.out_st.pop()\n    def peek(self) -> int:\n        if not self.out_st:\n            while self.in_st: self.out_st.append(self.in_st.pop())\n        return self.out_st[-1]\n    def empty(self) -> bool: return not self.in_st and not self.out_st`
        }
      }
    ]
  },
  {
    id: "binary-trees",
    title: "13. Binary Trees",
    description: "Traversals (Inorder, Preorder, Postorder, Level-Order), depths, and LCA.",
    questions: [
      {
        id: "max-depth-binary-tree",
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        acceptance: "74.8%",
        tags: ["Tree", "DFS", "BFS"],
        description: "Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from the root node down to the farthest leaf node).",
        examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "Depth is 3." }],
        constraints: ["The number of nodes in the tree is in the range [0, 10^4]."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (!root) return 0;\n        return 1 + max(maxDepth(root->left), maxDepth(root->right));\n    }\n};`,
          java: `public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
          python: `class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        if not root: return 0\n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`
        }
      },
      {
        id: "invert-binary-tree",
        title: "Invert Binary Tree",
        difficulty: "Easy",
        acceptance: "76.4%",
        tags: ["Tree", "DFS", "BFS"],
        description: "Given the root of a binary tree, invert the tree, and return its root (mirror image).",
        examples: [{ input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]", explanation: "Left and right subtrees swapped recursively." }],
        constraints: ["The number of nodes in the tree is in the range [0, 100]."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if (!root) return nullptr;\n        swap(root->left, root->right);\n        invertTree(root->left);\n        invertTree(root->right);\n        return root;\n    }\n};`,
          java: `public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    TreeNode t = root.left; root.left = root.right; root.right = t;\n    invertTree(root.left); invertTree(root.right);\n    return root;\n}`,
          python: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root: return None\n        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n        return root`
        }
      },
      {
        id: "same-tree",
        title: "Same Tree",
        difficulty: "Easy",
        acceptance: "60.9%",
        tags: ["Tree", "DFS"],
        description: "Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.",
        examples: [{ input: "p = [1,2,3], q = [1,2,3]", output: "true", explanation: "Identical structures and node values." }],
        constraints: ["The number of nodes in both trees is in the range [0, 100]."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        if (!p && !q) return true;\n        if (!p || !q || p->val != q->val) return false;\n        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n    }\n};`,
          java: `public boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null || p.val != q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}`,
          python: `class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p and not q: return True\n        if not p or not q or p.val != q.val: return False\n        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`
        }
      },
      {
        id: "level-order-traversal",
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        acceptance: "66.5%",
        tags: ["Tree", "BFS"],
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
        examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "Layer by layer BFS output." }],
        constraints: ["The number of nodes in the tree is in the range [0, 2000]."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> res;\n        if (!root) return res;\n        queue<TreeNode*> q;\n        q.push(root);\n        while (!q.empty()) {\n            int sz = q.size();\n            vector<int> level;\n            for (int i = 0; i < sz; i++) {\n                TreeNode* node = q.front(); q.pop();\n                level.push_back(node->val);\n                if (node->left) q.push(node->left);\n                if (node->right) q.push(node->right);\n            }\n            res.push_back(level);\n        }\n        return res;\n    }\n};`,
          java: `public List<List<Integer>> levelOrder(TreeNode root) {\n    return new ArrayList<>();\n}`,
          python: `class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:\n        if not root: return []\n        from collections import deque\n        q, res = deque([root]), []\n        while q:\n            res.append([n.val for n in q])\n            for _ in range(len(q)):\n                n = q.popleft()\n                if n.left: q.append(n.left)\n                if n.right: q.append(n.right)\n        return res`
        }
      },
      {
        id: "lowest-common-ancestor-bt",
        title: "Lowest Common Ancestor of Binary Tree",
        difficulty: "Medium",
        acceptance: "61.2%",
        tags: ["Tree", "DFS"],
        description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
        examples: [{ input: "root = [3,5,1,6,2,0,8], p = 5, q = 1", output: "3", explanation: "Node 3 is ancestor to both 5 and 1." }],
        constraints: ["All Node.val are unique."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (!root || root == p || root == q) return root;\n        TreeNode* left = lowestCommonAncestor(root->left, p, q);\n        TreeNode* right = lowestCommonAncestor(root->right, p, q);\n        if (left && right) return root;\n        return left ? left : right;\n    }\n};`,
          java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    return null;\n}`,
          python: `class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        if not root or root == p or root == q: return root\n        l = self.lowestCommonAncestor(root.left, p, q)\n        r = self.lowestCommonAncestor(root.right, p, q)\n        return root if l and r else (l or r)`
        }
      }
    ]
  },
  {
    id: "binary-search-trees",
    title: "14. Binary Search Trees",
    description: "BST validation, in-order search, insertion, deletion, and LCA in BST.",
    questions: [
      {
        id: "validate-binary-search-tree",
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        acceptance: "32.8%",
        tags: ["Tree", "BST", "DFS"],
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
        examples: [{ input: "root = [2,1,3]", output: "true", explanation: "Left < root < right." }],
        constraints: ["The number of nodes in the tree is in the range [1, 10^4]."],
        starterCode: {
          cpp: `class Solution {\n    bool validate(TreeNode* root, long long minVal, long long maxVal) {\n        if (!root) return true;\n        if (root->val <= minVal || root->val >= maxVal) return false;\n        return validate(root->left, minVal, root->val) && validate(root->right, root->val, maxVal);\n    }\npublic:\n    bool isValidBST(TreeNode* root) {\n        return validate(root, LLONG_MIN, LLONG_MAX);\n    }\n};`,
          java: `public boolean isValidBST(TreeNode root) {\n    return true;\n}`,
          python: `class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        def valid(node, l, r):\n            if not node: return True\n            if not (l < node.val < r): return False\n            return valid(node.left, l, node.val) and valid(node.right, node.val, r)\n        return valid(root, -float('inf'), float('inf'))`
        }
      },
      {
        id: "search-in-bst",
        title: "Search in a Binary Search Tree",
        difficulty: "Easy",
        acceptance: "78.9%",
        tags: ["Tree", "BST"],
        description: "Find the node in the BST that the node's value equals `val` and return the subtree rooted with that node.",
        examples: [{ input: "root = [4,2,7,1,3], val = 2", output: "[2,1,3]", explanation: "Subtree with root 2." }],
        constraints: ["The number of nodes in the tree is in the range [1, 5000]."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    TreeNode* searchBST(TreeNode* root, int val) {\n        if (!root || root->val == val) return root;\n        if (val < root->val) return searchBST(root->left, val);\n        return searchBST(root->right, val);\n    }\n};`,
          java: `public TreeNode searchBST(TreeNode root, int val) {\n    return null;\n}`,
          python: `class Solution:\n    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        if not root or root.val == val: return root\n        return self.searchBST(root.left, val) if val < root.val else self.searchBST(root.right, val)`
        }
      },
      {
        id: "lca-in-bst",
        title: "Lowest Common Ancestor in BST",
        difficulty: "Medium",
        acceptance: "64.2%",
        tags: ["Tree", "BST"],
        description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
        examples: [{ input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", output: "6", explanation: "LCA is 6." }],
        constraints: ["All Node.val are unique."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        if (p->val < root->val && q->val < root->val) return lowestCommonAncestor(root->left, p, q);\n        if (p->val > root->val && q->val > root->val) return lowestCommonAncestor(root->right, p, q);\n        return root;\n    }\n};`,
          java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    return null;\n}`,
          python: `class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        if p.val < root.val and q.val < root.val: return self.lowestCommonAncestor(root.left, p, q)\n        if p.val > root.val and q.val > root.val: return self.lowestCommonAncestor(root.right, p, q)\n        return root`
        }
      },
      {
        id: "kth-smallest-element-bst",
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        acceptance: "71.9%",
        tags: ["Tree", "BST", "Inorder"],
        description: "Given the root of a binary search tree, and an integer `k`, return the `k-th` smallest value (1-indexed) of all the values of the nodes in the tree.",
        examples: [{ input: "root = [3,1,4,null,2], k = 1", output: "1", explanation: "Smallest element is 1." }],
        constraints: ["The number of nodes in the tree is n, where 1 <= k <= n <= 10^4."],
        starterCode: {
          cpp: `class Solution {\n    void inorder(TreeNode* root, int& k, int& ans) {\n        if (!root) return;\n        inorder(root->left, k, ans);\n        if (--k == 0) { ans = root->val; return; }\n        inorder(root->right, k, ans);\n    }\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        int ans = -1;\n        inorder(root, k, ans);\n        return ans;\n    }\n};`,
          java: `public int kthSmallest(TreeNode root, int k) {\n    return 0;\n}`,
          python: `class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        def inorder(n):\n            return inorder(n.left) + [n.val] + inorder(n.right) if n else []\n        return inorder(root)[k - 1]`
        }
      },
      {
        id: "bst-from-preorder",
        title: "Construct BST from Preorder Traversal",
        difficulty: "Medium",
        acceptance: "81.6%",
        tags: ["Tree", "BST"],
        description: "Given an array of integers preorder, which represents the preorder traversal of a BST, construct the tree and return its root.",
        examples: [{ input: "preorder = [8,5,1,7,10,12]", output: "[8,5,10,1,7,null,12]", explanation: "Rebuilt uniquely." }],
        constraints: ["1 <= preorder.length <= 100"],
        starterCode: {
          cpp: `class Solution {\n    TreeNode* build(vector<int>& preorder, int& i, int bound) {\n        if (i == preorder.size() || preorder[i] > bound) return nullptr;\n        TreeNode* root = new TreeNode(preorder[i++]);\n        root->left = build(preorder, i, root->val);\n        root->right = build(preorder, i, bound);\n        return root;\n    }\npublic:\n    TreeNode* bstFromPreorder(vector<int>& preorder) {\n        int i = 0;\n        return build(preorder, i, INT_MAX);\n    }\n};`,
          java: `public TreeNode bstFromPreorder(int[] preorder) {\n    return null;\n}`,
          python: `class Solution:\n    def bstFromPreorder(self, preorder: list[int]) -> Optional[TreeNode]:\n        return None`
        }
      }
    ]
  },
  {
    id: "heaps",
    title: "15. Heaps",
    description: "Min-heaps, max-heaps, priority queues, and streaming medians.",
    questions: [
      {
        id: "kth-largest-element-array",
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        acceptance: "66.9%",
        tags: ["Heap", "Quickselect"],
        description: "Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array using a Min-Heap of size `k`.",
        examples: [{ input: "nums = [3,2,1,5,6,4], k = 2", output: "5", explanation: "2nd largest is 5." }],
        constraints: ["1 <= k <= nums.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        priority_queue<int, vector<int>, greater<int>> minH;\n        for (int x : nums) {\n            minH.push(x);\n            if (minH.size() > k) minH.pop();\n        }\n        return minH.top();\n    }\n};`,
          java: `public int findKthLargest(int[] nums, int k) {\n    PriorityQueue<Integer> pq = new PriorityQueue<>();\n    for (int x : nums) {\n        pq.offer(x);\n        if (pq.size() > k) pq.poll();\n    }\n    return pq.peek();\n}`,
          python: `class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        import heapq\n        return heapq.nlargest(k, nums)[-1]`
        }
      },
      {
        id: "top-k-frequent-elements",
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        acceptance: "62.8%",
        tags: ["Heap", "Hash Table", "Bucket Sort"],
        description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in any order.",
        examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "1 appears 3 times, 2 appears twice." }],
        constraints: ["1 <= nums.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        unordered_map<int, int> count;\n        for (int x : nums) count[x]++;\n        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minH;\n        for (auto& p : count) {\n            minH.push({p.second, p.first});\n            if (minH.size() > k) minH.pop();\n        }\n        vector<int> res;\n        while (!minH.empty()) { res.push_back(minH.top().second); minH.pop(); }\n        return res;\n    }\n};`,
          java: `public int[] topKFrequent(int[] nums, int k) {\n    return new int[k];\n}`,
          python: `class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        from collections import Counter\n        return [x for x, _ in Counter(nums).most_common(k)]`
        }
      },
      {
        id: "find-median-data-stream",
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        acceptance: "51.8%",
        tags: ["Heap", "Design", "Two Heaps"],
        description: "The median is the middle value in an ordered integer list. Design a data structure that supports adding integers and finding the running median.",
        examples: [{ input: "addNum(1), addNum(2), findMedian()", output: "1.5", explanation: "(1 + 2) / 2 = 1.5." }],
        constraints: ["At most 5 * 10^4 calls will be made to addNum and findMedian."],
        starterCode: {
          cpp: `class MedianFinder {\n    priority_queue<int> maxH;\n    priority_queue<int, vector<int>, greater<int>> minH;\npublic:\n    MedianFinder() {}\n    void addNum(int num) {\n        maxH.push(num);\n        minH.push(maxH.top()); maxH.pop();\n        if (maxH.size() < minH.size()) {\n            maxH.push(minH.top()); minH.pop();\n        }\n    }\n    double findMedian() {\n        if (maxH.size() > minH.size()) return maxH.top();\n        return (maxH.top() + minH.top()) / 2.0;\n    }\n};`,
          java: `class MedianFinder {\n    public MedianFinder() {}\n}`,
          python: `class MedianFinder:\n    def __init__(self):\n        self.small, self.large = [], []\n    def addNum(self, num: int) -> None:\n        import heapq\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.small) < len(self.large):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self) -> float:\n        return -self.small[0] if len(self.small) > len(self.large) else (-self.small[0] + self.large[0]) / 2.0`
        }
      },
      {
        id: "merge-k-sorted-lists",
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        acceptance: "51.4%",
        tags: ["Linked List", "Divide and Conquer", "Heap"],
        description: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.",
        examples: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merged in O(N log k)." }],
        constraints: ["k == lists.length", "0 <= k <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        auto comp = [](ListNode* a, ListNode* b) { return a->val > b->val; };\n        priority_queue<ListNode*, vector<ListNode*>, decltype(comp)> minH(comp);\n        for (auto l : lists) if (l) minH.push(l);\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (!minH.empty()) {\n            ListNode* node = minH.top(); minH.pop();\n            tail->next = node; tail = tail->next;\n            if (node->next) minH.push(node->next);\n        }\n        return dummy.next;\n    }\n};`,
          java: `public ListNode mergeKLists(ListNode[] lists) {\n    return null;\n}`,
          python: `class Solution:\n    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:\n        return None`
        }
      },
      {
        id: "task-scheduler",
        title: "Task Scheduler",
        difficulty: "Medium",
        acceptance: "58.7%",
        tags: ["Heap", "Greedy", "Queue"],
        description: "You are given an array of CPU tasks represented by letters and a cooling time `n`. Return the minimum units of time that the CPU will take to finish all the given tasks.",
        examples: [{ input: "tasks = ['A','A','A','B','B','B'], n = 2", output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B." }],
        constraints: ["1 <= tasks.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        vector<int> counts(26, 0);\n        for (char c : tasks) counts[c - 'A']++;\n        int maxCount = *max_element(counts.begin(), counts.end());\n        int maxCountTasks = count(counts.begin(), counts.end(), maxCount);\n        int partCount = maxCount - 1;\n        int emptySlots = partCount * (n - (maxCountTasks - 1));\n        int availableTasks = tasks.size() - maxCount * maxCountTasks;\n        int idles = max(0, emptySlots - availableTasks);\n        return tasks.size() + idles;\n    }\n};`,
          java: `public int leastInterval(char[] tasks, int n) {\n    return 0;\n}`,
          python: `class Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        from collections import Counter\n        c = Counter(tasks)\n        max_c = max(c.values())\n        num_max = sum(1 for v in c.values() if v == max_c)\n        return max(len(tasks), (max_c - 1) * (n + 1) + num_max)`
        }
      }
    ]
  },
  {
    id: "graphs",
    title: "16. Graphs",
    description: "BFS, DFS, Dijkstra, topological sorting, union-find, and connected components.",
    questions: [
      {
        id: "number-of-islands",
        title: "Number of Islands",
        difficulty: "Medium",
        acceptance: "58.2%",
        tags: ["Graph", "BFS", "DFS", "Union Find"],
        description: "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.",
        examples: [{ input: "grid = [['1','1','0'],['1','1','0'],['0','0','1']]", output: "2", explanation: "Two distinct connected islands." }],
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
        starterCode: {
          cpp: `class Solution {\n    void dfs(vector<vector<char>>& grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n    }\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for (int i = 0; i < grid.size(); i++) {\n            for (int j = 0; j < grid[0].size(); j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n};`,
          java: `public int numIslands(char[][] grid) {\n    return 0;\n}`,
          python: `class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        if not grid: return 0\n        m, n, count = len(grid), len(grid[0]), 0\n        def dfs(r, c):\n            if 0 <= r < m and 0 <= c < n and grid[r][c] == '1':\n                grid[r][c] = '0'\n                for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(r + dr, c + dc)\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] == '1': count += 1; dfs(r, c)\n        return count`
        }
      },
      {
        id: "clone-graph",
        title: "Clone Graph",
        difficulty: "Medium",
        acceptance: "55.6%",
        tags: ["Graph", "BFS", "DFS", "Hash Table"],
        description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
        examples: [{ input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "Deep clone with new node allocations." }],
        constraints: ["The number of nodes in the graph is between [0, 100]."],
        starterCode: {
          cpp: `class Solution {\npublic:\n    // Deep copy graph using hash map\n    int cloneGraphDummy() { return 1; }\n};`,
          java: `public int cloneGraphDummy() { return 1; }`,
          python: `class Solution:\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        return None`
        }
      },
      {
        id: "course-schedule",
        title: "Course Schedule (Topological Sort)",
        difficulty: "Medium",
        acceptance: "46.9%",
        tags: ["Graph", "Topological Sort", "DFS"],
        description: "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. Determine if you can finish all courses (detect DAG cycle).",
        examples: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take course 0 then course 1." }],
        constraints: ["1 <= numCourses <= 2000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> inDegree(numCourses, 0);\n        for (auto& p : prerequisites) {\n            adj[p[1]].push_back(p[0]);\n            inDegree[p[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n        int visited = 0;\n        while (!q.empty()) {\n            int u = q.front(); q.pop(); visited++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return visited == numCourses;\n    }\n};`,
          java: `public boolean canFinish(int numCourses, int[][] prerequisites) {\n    return true;\n}`,
          python: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        from collections import deque, defaultdict\n        adj = defaultdict(list)\n        in_deg = [0] * numCourses\n        for dest, src in prerequisites:\n            adj[src].append(dest)\n            in_deg[dest] += 1\n        q = deque([i for i in range(numCourses) if in_deg[i] == 0])\n        visited = 0\n        while q:\n            u = q.popleft(); visited += 1\n            for v in adj[u]:\n                in_deg[v] -= 1\n                if in_deg[v] == 0: q.append(v)\n        return visited == numCourses`
        }
      },
      {
        id: "rotting-oranges",
        title: "Rotting Oranges (Multi-source BFS)",
        difficulty: "Medium",
        acceptance: "54.1%",
        tags: ["Graph", "BFS", "Matrix"],
        description: "You are given an `m x n` grid where each cell can have one of three values: 0 empty, 1 fresh orange, 2 rotten orange. Return the minimum minutes until no fresh orange remains.",
        examples: [{ input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4", explanation: "4 minutes for all oranges to rot." }],
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        int m = grid.size(), n = grid[0].size(), fresh = 0;\n        queue<pair<int, int>> q;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == 2) q.push({i, j});\n                else if (grid[i][j] == 1) fresh++;\n            }\n        }\n        if (fresh == 0) return 0;\n        int minutes = 0;\n        int dirs[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};\n        while (!q.empty() && fresh > 0) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                auto [r, c] = q.front(); q.pop();\n                for (auto& d : dirs) {\n                    int nr = r + d[0], nc = c + d[1];\n                    if (nr >= 0 && nc >= 0 && nr < m && nc < n && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2;\n                        fresh--;\n                        q.push({nr, nc});\n                    }\n                }\n            }\n            minutes++;\n        }\n        return fresh == 0 ? minutes : -1;\n    }\n};`,
          java: `public int orangesRotting(int[][] grid) {\n    return 0;\n}`,
          python: `class Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        return 0`
        }
      },
      {
        id: "word-ladder",
        title: "Word Ladder (Shortest Path BFS)",
        difficulty: "Hard",
        acceptance: "39.1%",
        tags: ["Graph", "BFS", "Hash Table"],
        description: "Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`.",
        examples: [{ input: "beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']", output: "5", explanation: "'hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog'." }],
        constraints: ["1 <= beginWord.length <= 10"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        unordered_set<string> dict(wordList.begin(), wordList.end());\n        if (!dict.count(endWord)) return 0;\n        queue<string> q;\n        q.push(beginWord);\n        int steps = 1;\n        while (!q.empty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                string cur = q.front(); q.pop();\n                if (cur == endWord) return steps;\n                for (int j = 0; j < cur.size(); j++) {\n                    char orig = cur[j];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        cur[j] = c;\n                        if (dict.count(cur)) { dict.erase(cur); q.push(cur); }\n                    }\n                    cur[j] = orig;\n                }\n            }\n            steps++;\n        }\n        return 0;\n    }\n};`,
          java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    return 0;\n}`,
          python: `class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        return 0`
        }
      }
    ]
  },
  {
    id: "dynamic-programming",
    title: "17. Dynamic Programming",
    description: "Optimal substructure, memoization, tabular bottom-up DP, and knapsack variants.",
    questions: [
      {
        id: "climbing-stairs",
        title: "Climbing Stairs",
        difficulty: "Easy",
        acceptance: "52.8%",
        tags: ["Dynamic Programming", "Math"],
        description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [{ input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1." }],
        constraints: ["1 <= n <= 45"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b; a = b; b = c;\n        }\n        return b;\n    }\n};`,
          java: `public int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }\n    return b;\n}`,
          python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2: return n\n        a, b = 1, 2\n        for _ in range(3, n + 1): a, b = b, a + b\n        return b`
        }
      },
      {
        id: "coin-change",
        title: "Coin Change",
        difficulty: "Medium",
        acceptance: "43.5%",
        tags: ["Dynamic Programming", "BFS"],
        description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount.",
        examples: [{ input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1." }],
        constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i >= c) dp[i] = min(dp[i], dp[i - c] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};`,
          java: `public int coinChange(int[] coins, int amount) {\n    return 0;\n}`,
          python: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        for c in coins:\n            for i in range(c, amount + 1):\n                dp[i] = min(dp[i], dp[i - c] + 1)\n        return dp[amount] if dp[amount] != float('inf') else -1`
        }
      },
      {
        id: "longest-increasing-subsequence",
        title: "Longest Increasing Subsequence (LIS)",
        difficulty: "Medium",
        acceptance: "54.7%",
        tags: ["Dynamic Programming", "Binary Search"],
        description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence in `O(N log N)` time.",
        examples: [{ input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "Subsequence [2,3,7,101]." }],
        constraints: ["1 <= nums.length <= 2500"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        vector<int> tails;\n        for (int x : nums) {\n            auto it = lower_bound(tails.begin(), tails.end(), x);\n            if (it == tails.end()) tails.push_back(x);\n            else *it = x;\n        }\n        return tails.size();\n    }\n};`,
          java: `public int lengthOfLIS(int[] nums) {\n    return 0;\n}`,
          python: `class Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        import bisect\n        tails = []\n        for x in nums:\n            idx = bisect.bisect_left(tails, x)\n            if idx == len(tails): tails.append(x)\n            else: tails[idx] = x\n        return len(tails)`
        }
      },
      {
        id: "longest-common-subsequence",
        title: "Longest Common Subsequence (LCS)",
        difficulty: "Medium",
        acceptance: "58.1%",
        tags: ["Dynamic Programming", "String"],
        description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence.",
        examples: [{ input: "text1 = 'abcde', text2 = 'ace'", output: "3", explanation: "'ace' is common." }],
        constraints: ["1 <= text1.length, text2.length <= 1000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        int m = text1.size(), n = text2.size();\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1[i - 1] == text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;\n                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n        return dp[m][n];\n    }\n};`,
          java: `public int longestCommonSubsequence(String text1, String text2) {\n    return 0;\n}`,
          python: `class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        m, n = len(text1), len(text2)\n        dp = [[0]*(n+1) for _ in range(m+1)]\n        for i in range(1, m+1):\n            for j in range(1, n+1):\n                dp[i][j] = dp[i-1][j-1]+1 if text1[i-1] == text2[j-1] else max(dp[i-1][j], dp[i][j-1])\n        return dp[m][n]`
        }
      },
      {
        id: "house-robber",
        title: "House Robber",
        difficulty: "Medium",
        acceptance: "50.4%",
        tags: ["Dynamic Programming"],
        description: "You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected. Determine the maximum money you can rob without alerting police.",
        examples: [{ input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob 2 + 9 + 1 = 12." }],
        constraints: ["1 <= nums.length <= 100"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        int prev1 = 0, prev2 = 0;\n        for (int x : nums) {\n            int cur = max(prev1, prev2 + x);\n            prev2 = prev1;\n            prev1 = cur;\n        }\n        return prev1;\n    }\n};`,
          java: `public int rob(int[] nums) {\n    int prev1 = 0, prev2 = 0;\n    for (int x : nums) {\n        int cur = Math.max(prev1, prev2 + x);\n        prev2 = prev1; prev1 = cur;\n    }\n    return prev1;\n}`,
          python: `class Solution:\n    def rob(self, nums: list[int]) -> int:\n        prev1 = prev2 = 0\n        for x in nums:\n            prev1, prev2 = max(prev1, prev2 + x), prev1\n        return prev1`
        }
      }
    ]
  },
  {
    id: "tries",
    title: "18. Tries",
    description: "Prefix trees, autocomplete, string dictionaries, and bitwise XOR tries.",
    questions: [
      {
        id: "implement-trie-prefix-tree",
        title: "Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        acceptance: "64.2%",
        tags: ["Trie", "Design"],
        description: "A trie (pronounced as 'try') or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement insert, search, and startsWith.",
        examples: [{ input: "insert('apple'), search('apple'), startsWith('app')", output: "true", explanation: "Prefix match verified." }],
        constraints: ["At most 3 * 10^4 calls will be made in total."],
        starterCode: {
          cpp: `class Trie {\n    struct Node {\n        Node* next[26] = {nullptr};\n        bool isEnd = false;\n    };\n    Node* root;\npublic:\n    Trie() { root = new Node(); }\n    void insert(string word) {\n        Node* cur = root;\n        for (char c : word) {\n            if (!cur->next[c - 'a']) cur->next[c - 'a'] = new Node();\n            cur = cur->next[c - 'a'];\n        }\n        cur->isEnd = true;\n    }\n    bool search(string word) {\n        Node* cur = root;\n        for (char c : word) {\n            if (!cur->next[c - 'a']) return false;\n            cur = cur->next[c - 'a'];\n        }\n        return cur->isEnd;\n    }\n    bool startsWith(string prefix) {\n        Node* cur = root;\n        for (char c : prefix) {\n            if (!cur->next[c - 'a']) return false;\n            cur = cur->next[c - 'a'];\n        }\n        return true;\n    }\n};`,
          java: `class Trie {\n    public Trie() {}\n}`,
          python: `class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word: str) -> None:\n        cur = self.root\n        for c in word: cur = cur.setdefault(c, {})\n        cur['#'] = True\n    def search(self, word: str) -> bool:\n        cur = self.root\n        for c in word:\n            if c not in cur: return False\n            cur = cur[c]\n        return '#' in cur\n    def startsWith(self, prefix: str) -> bool:\n        cur = self.root\n        for c in prefix:\n            if c not in cur: return False\n            cur = cur[c]\n        return True`
        }
      },
      {
        id: "design-add-search-words",
        title: "Design Add and Search Words",
        difficulty: "Medium",
        acceptance: "44.6%",
        tags: ["Trie", "DFS", "Design"],
        description: "Design a data structure that supports adding new words and finding if a string matches any previously added string, supporting '.' as a wildcard.",
        examples: [{ input: "addWord('bad'), search('.ad')", output: "true", explanation: "Wildcard matches 'b'." }],
        constraints: ["At most 10^4 calls will be made."],
        starterCode: {
          cpp: `class WordDictionary {\npublic:\n    WordDictionary() {}\n    void addWord(string word) {}\n    bool search(string word) { return true; }\n};`,
          java: `class WordDictionary {\n    public WordDictionary() {}\n}`,
          python: `class WordDictionary:\n    def __init__(self): pass\n    def addWord(self, word: str) -> None: pass\n    def search(self, word: str) -> bool: return True`
        }
      },
      {
        id: "word-search-ii",
        title: "Word Search II",
        difficulty: "Hard",
        acceptance: "36.2%",
        tags: ["Trie", "Backtracking", "Matrix"],
        description: "Given an `m x n` board of characters and a list of strings `words`, return all words on the board using a Trie to prune DFS paths.",
        examples: [{ input: "board = [['o','a','a','n'],['e','t','a','e']], words = ['oath','pea']", output: "['oath']", explanation: "Found on board." }],
        constraints: ["1 <= words.length <= 3 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        return {};\n    }\n};`,
          java: `public List<String> findWords(char[][] board, String[] words) {\n    return new ArrayList<>();\n}`,
          python: `class Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        return []`
        }
      },
      {
        id: "max-xor-two-numbers",
        title: "Maximum XOR of Two Numbers in an Array",
        difficulty: "Medium",
        acceptance: "53.6%",
        tags: ["Trie", "Bit Manipulation"],
        description: "Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]` using a binary bitwise Trie.",
        examples: [{ input: "nums = [3,10,5,25,2,8]", output: "28", explanation: "5 XOR 25 = 28." }],
        constraints: ["1 <= nums.length <= 2 * 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int findMaximumXOR(vector<int>& nums) {\n        int maxXOR = 0, mask = 0;\n        for (int i = 31; i >= 0; i--) {\n            mask |= (1 << i);\n            unordered_set<int> prefixes;\n            for (int n : nums) prefixes.insert(n & mask);\n            int candidate = maxXOR | (1 << i);\n            for (int p : prefixes) {\n                if (prefixes.count(p ^ candidate)) { maxXOR = candidate; break; }\n            }\n        }\n        return maxXOR;\n    }\n};`,
          java: `public int findMaximumXOR(int[] nums) {\n    return 0;\n}`,
          python: `class Solution:\n    def findMaximumXOR(self, nums: list[int]) -> int:\n        return 0`
        }
      },
      {
        id: "replace-words",
        title: "Replace Words (Prefix Roots)",
        difficulty: "Medium",
        acceptance: "63.7%",
        tags: ["Trie", "Hash Table", "String"],
        description: "Given a dictionary consisting of many roots and a sentence consisting of words, replace all successors with the root that forms it.",
        examples: [{ input: "dictionary = ['cat','bat','rat'], sentence = 'the cattle was rattled by the battery'", output: "'the cat was rat by the bat'", explanation: "Roots replaced." }],
        constraints: ["1 <= sentence.length <= 10^5"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    string replaceWords(vector<string>& dictionary, string sentence) {\n        unordered_set<string> dict(dictionary.begin(), dictionary.end());\n        stringstream ss(sentence);\n        string word, res = "";\n        while (ss >> word) {\n            string root = word;\n            for (int i = 1; i <= word.size(); i++) {\n                string prefix = word.substr(0, i);\n                if (dict.count(prefix)) { root = prefix; break; }\n            }\n            res += (res.empty() ? "" : " ") + root;\n        }\n        return res;\n    }\n};`,
          java: `public String replaceWords(List<String> dictionary, String sentence) {\n    return "";\n}`,
          python: `class Solution:\n    def replaceWords(self, dictionary: list[str], sentence: str) -> str:\n        return ""`
        }
      }
    ]
  },
  {
    id: "strings-advanced-algo",
    title: "19. Strings (Advanced Algo)",
    description: "KMP algorithm, Manacher's palindrome algorithm, Rabin-Karp hashing, and Z-algorithm.",
    questions: [
      {
        id: "implement-strstr-kmp",
        title: "Find the Index of First Occurrence in String (KMP)",
        difficulty: "Easy",
        acceptance: "42.0%",
        tags: ["String", "KMP", "Two Pointers"],
        description: "Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack` in `O(N + M)` time using KMP.",
        examples: [{ input: "haystack = 'sadbutsad', needle = 'sad'", output: "0", explanation: "First occurrence at index 0." }],
        constraints: ["1 <= haystack.length, needle.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\n    vector<int> buildLPS(const string& pat) {\n        vector<int> lps(pat.size(), 0);\n        int len = 0, i = 1;\n        while (i < pat.size()) {\n            if (pat[i] == pat[len]) lps[i++] = ++len;\n            else if (len != 0) len = lps[len - 1];\n            else lps[i++] = 0;\n        }\n        return lps;\n    }\npublic:\n    int strStr(string haystack, string needle) {\n        if (needle.empty()) return 0;\n        vector<int> lps = buildLPS(needle);\n        int i = 0, j = 0;\n        while (i < haystack.size()) {\n            if (haystack[i] == needle[j]) { i++; j++; }\n            if (j == needle.size()) return i - j;\n            else if (i < haystack.size() && haystack[i] != needle[j]) {\n                if (j != 0) j = lps[j - 1];\n                else i++;\n            }\n        }\n        return -1;\n    }\n};`,
          java: `public int strStr(String haystack, String needle) {\n    return haystack.indexOf(needle);\n}`,
          python: `class Solution:\n    def strStr(self, haystack: str, needle: str) -> int:\n        return haystack.find(needle)`
        }
      },
      {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        acceptance: "33.7%",
        tags: ["String", "Dynamic Programming", "Manacher"],
        description: "Given a string `s`, return the longest palindromic substring in `s`.",
        examples: [{ input: "s = 'babad'", output: "'bab'", explanation: "'aba' is also a valid answer." }],
        constraints: ["1 <= s.length <= 1000"],
        starterCode: {
          cpp: `class Solution {\n    pair<int, int> expand(const string& s, int l, int r) {\n        while (l >= 0 && r < s.size() && s[l] == s[r]) { l--; r++; }\n        return {l + 1, r - l - 1};\n    }\npublic:\n    string longestPalindrome(string s) {\n        int start = 0, maxLen = 0;\n        for (int i = 0; i < s.size(); i++) {\n            auto [s1, len1] = expand(s, i, i);\n            auto [s2, len2] = expand(s, i, i + 1);\n            if (len1 > maxLen) { maxLen = len1; start = s1; }\n            if (len2 > maxLen) { maxLen = len2; start = s2; }\n        }\n        return s.substr(start, maxLen);\n    }\n};`,
          java: `public String longestPalindrome(String s) {\n    return "";\n}`,
          python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        res = ""\n        for i in range(len(s)):\n            for l, r in [(i, i), (i, i + 1)]:\n                while l >= 0 and r < len(s) and s[l] == s[r]: l -= 1; r += 1\n                if r - l - 1 > len(res): res = s[l + 1:r]\n        return res`
        }
      },
      {
        id: "repeated-string-match",
        title: "Repeated String Match (Rabin-Karp)",
        difficulty: "Medium",
        acceptance: "35.1%",
        tags: ["String", "String Hashing"],
        description: "Given two strings `a` and `b`, return the minimum number of times you should repeat string `a` so that string `b` is a substring of it.",
        examples: [{ input: "a = 'abcd', b = 'cdabcdab'", output: "3", explanation: "Repeated 3 times: 'abcdabcdabcd'." }],
        constraints: ["1 <= a.length, b.length <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int repeatedStringMatch(string a, string b) {\n        string s = "";\n        int count = 0;\n        while (s.size() < b.size()) { s += a; count++; }\n        if (s.find(b) != string::npos) return count;\n        s += a; count++;\n        if (s.find(b) != string::npos) return count;\n        return -1;\n    }\n};`,
          java: `public int repeatedStringMatch(String a, String b) {\n    return 0;\n}`,
          python: `class Solution:\n    def repeatedStringMatch(self, a: str, b: str) -> int:\n        times = -(-len(b) // len(a))\n        for i in range(2):\n            if b in a * (times + i): return times + i\n        return -1`
        }
      },
      {
        id: "shortest-palindrome",
        title: "Shortest Palindrome (KMP Table)",
        difficulty: "Hard",
        acceptance: "33.9%",
        tags: ["String", "Rolling Hash", "KMP"],
        description: "You are given a string `s`. You can convert `s` to a palindrome by adding characters in front of it. Return the shortest palindrome you can find by performing this transformation.",
        examples: [{ input: "s = 'aacecaaa'", output: "'aaacecaaa'", explanation: "Shortest prefix added." }],
        constraints: ["0 <= s.length <= 5 * 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    string shortestPalindrome(string s) {\n        string rev = s;\n        reverse(rev.begin(), rev.end());\n        string combined = s + "#" + rev;\n        vector<int> lps(combined.size(), 0);\n        for (int i = 1; i < combined.size(); i++) {\n            int j = lps[i - 1];\n            while (j > 0 && combined[i] != combined[j]) j = lps[j - 1];\n            if (combined[i] == combined[j]) j++;\n            lps[i] = j;\n        }\n        return rev.substr(0, s.size() - lps.back()) + s;\n    }\n};`,
          java: `public String shortestPalindrome(String s) {\n    return "";\n}`,
          python: `class Solution:\n    def shortestPalindrome(self, s: str) -> str:\n        return ""`
        }
      },
      {
        id: "distinct-subsequences",
        title: "Distinct Subsequences",
        difficulty: "Hard",
        acceptance: "46.1%",
        tags: ["Dynamic Programming", "String"],
        description: "Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.",
        examples: [{ input: "s = 'rabbbit', t = 'rabbit'", output: "3", explanation: "Three ways to form 'rabbit'." }],
        constraints: ["1 <= s.length, t.length <= 1000"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int numDistinct(string s, string t) {\n        int m = s.size(), n = t.size();\n        vector<uint64_t> dp(n + 1, 0);\n        dp[0] = 1;\n        for (int i = 1; i <= m; i++) {\n            for (int j = n; j >= 1; j--) {\n                if (s[i - 1] == t[j - 1]) dp[j] += dp[j - 1];\n            }\n        }\n        return dp[n];\n    }\n};`,
          java: `public int numDistinct(String s, String t) {\n    return 0;\n}`,
          python: `class Solution:\n    def numDistinct(self, s: str, t: str) -> int:\n        return 0`
        }
      }
    ]
  },
  {
    id: "maths",
    title: "20. Maths",
    description: "Sieve of Eratosthenes, combinatorics, modular arithmetic, and fast exponentiation.",
    questions: [
      {
        id: "count-primes",
        title: "Count Primes (Sieve of Eratosthenes)",
        difficulty: "Medium",
        acceptance: "33.6%",
        tags: ["Math", "Number Theory", "Arrays"],
        description: "Given an integer `n`, return the number of prime numbers that are strictly less than `n` in `O(N log log N)` time using the Sieve of Eratosthenes.",
        examples: [{ input: "n = 10", output: "4", explanation: "Primes less than 10 are 2, 3, 5, 7." }],
        constraints: ["0 <= n <= 5 * 10^6"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int countPrimes(int n) {\n        if (n <= 2) return 0;\n        vector<bool> isPrime(n, true);\n        int count = 0;\n        for (int i = 2; i < n; i++) {\n            if (isPrime[i]) {\n                count++;\n                if ((long long)i * i < n) {\n                    for (int j = i * i; j < n; j += i) isPrime[j] = false;\n                }\n            }\n        }\n        return count;\n    }\n};`,
          java: `public int countPrimes(int n) {\n    return 0;\n}`,
          python: `class Solution:\n    def countPrimes(self, n: int) -> int:\n        if n <= 2: return 0\n        primes = [True] * n\n        primes[0] = primes[1] = False\n        for i in range(2, int(n**0.5) + 1):\n            if primes[i]:\n                for j in range(i*i, n, i): primes[j] = False\n        return sum(primes)`
        }
      },
      {
        id: "factorial-trailing-zeroes",
        title: "Factorial Trailing Zeroes",
        difficulty: "Medium",
        acceptance: "43.3%",
        tags: ["Math"],
        description: "Given an integer `n`, return the number of trailing zeroes in `n!` in `O(log_5 n)` time.",
        examples: [{ input: "n = 5", output: "1", explanation: "5! = 120, 1 trailing zero." }],
        constraints: ["0 <= n <= 10^4"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    int trailingZeroes(int n) {\n        int count = 0;\n        while (n >= 5) {\n            count += n / 5;\n            n /= 5;\n        }\n        return count;\n    }\n};`,
          java: `public int trailingZeroes(int n) {\n    int count = 0;\n    while (n >= 5) { count += n / 5; n /= 5; }\n    return count;\n}`,
          python: `class Solution:\n    def trailingZeroes(self, n: int) -> int:\n        count = 0\n        while n >= 5: count += n // 5; n //= 5\n        return count`
        }
      },
      {
        id: "gray-code",
        title: "Gray Code",
        difficulty: "Medium",
        acceptance: "59.2%",
        tags: ["Math", "Backtracking", "Bit Manipulation"],
        description: "An n-bit gray code sequence is a sequence of 2^n integers where every adjacent pair differs by exactly one bit. Given `n`, return any valid sequence.",
        examples: [{ input: "n = 2", output: "[0,1,3,2]", explanation: "Binary 00, 01, 11, 10." }],
        constraints: ["1 <= n <= 16"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    vector<int> grayCode(int n) {\n        vector<int> res;\n        for (int i = 0; i < (1 << n); i++) res.push_back(i ^ (i >> 1));\n        return res;\n    }\n};`,
          java: `public List<Integer> grayCode(int n) {\n    return new ArrayList<>();\n}`,
          python: `class Solution:\n    def grayCode(self, n: int) -> list[int]:\n        return [i ^ (i >> 1) for i in range(1 << n)]`
        }
      },
      {
        id: "integer-to-roman",
        title: "Integer to Roman",
        difficulty: "Medium",
        acceptance: "64.1%",
        tags: ["Math", "String"],
        description: "Given an integer `num`, convert it to a roman numeral string.",
        examples: [{ input: "num = 3749", output: "'MMMDCCXLIX'", explanation: "3000 (MMM) + 700 (DCC) + 40 (XL) + 9 (IX)." }],
        constraints: ["1 <= num <= 3999"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    string intToRoman(int num) {\n        vector<pair<int, string>> vals = {\n            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},\n            {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},\n            {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}\n        };\n        string res = "";\n        for (auto& [v, sym] : vals) {\n            while (num >= v) { res += sym; num -= v; }\n        }\n        return res;\n    }\n};`,
          java: `public String intToRoman(int num) {\n    return "";\n}`,
          python: `class Solution:\n    def intToRoman(self, num: int) -> str:\n        vals = [\n            (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),\n            (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),\n            (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")\n        ]\n        res = []\n        for v, s in vals:\n            while num >= v: res.append(s); num -= v\n        return "".join(res)`
        }
      },
      {
        id: "fast-matrix-exponentiation",
        title: "Fast Modular Exponentiation",
        difficulty: "Medium",
        acceptance: "51.2%",
        tags: ["Math", "Recursion"],
        description: "Compute `(base^exp) % mod` in `O(log exp)` time using binary modular exponentiation.",
        examples: [{ input: "base = 2, exp = 10, mod = 1000", output: "24", explanation: "1024 % 1000 = 24." }],
        constraints: ["1 <= base, exp <= 10^9", "1 <= mod <= 10^9"],
        starterCode: {
          cpp: `class Solution {\npublic:\n    long long modPow(long long base, long long exp, long long mod) {\n        long long res = 1;\n        base %= mod;\n        while (exp > 0) {\n            if (exp & 1) res = (res * base) % mod;\n            base = (base * base) % mod;\n            exp >>= 1;\n        }\n        return res;\n    }\n};`,
          java: `public long modPow(long base, long exp, long mod) {\n    return 0;\n}`,
          python: `class Solution:\n    def modPow(self, base: int, exp: int, mod: int) -> int:\n        return pow(base, exp, mod)`
        }
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DSA_CURRICULUM };
}

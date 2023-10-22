import java.util.Arrays;
import java.util.Scanner;

public class test {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Read the number of elements (N)
        int N = scanner.nextInt();

        // Create an array to store the list
        int[] A = new int[N];

        // Read the list elements
        for (int i = 0; i < N; i++) {
            A[i] = scanner.nextInt();
        }

        // Call the function to calculate the shifted sum
        int result = calculateShiftedSum(A);

        // Display the result
        System.out.println(result);

        scanner.close();
    }

    public static int calculateShiftedSum(int[] A) {
        // Create a copy of the input array to keep the original order
        int[] originalArray = Arrays.copyOf(A, A.length);

        // Sort the array in ascending order
        Arrays.sort(A);

        int S = 0;

        for (int i = 0; i < A.length; i++) {
            int num = A[i];
            int shift = indexOf(originalArray, num);

            S += num * shift;
        }

        return S;
    }

    public static int indexOf(int[] array, int value) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return -1;
    }
}
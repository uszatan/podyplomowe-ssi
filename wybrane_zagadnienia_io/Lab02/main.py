"""Main execution module"""

from calculator import Calculator

if __name__ == "__main__":  # pragma: no cover
    # Basic operations
    calc = Calculator(10, 4)
    print(f"10 + 4 = {calc.sum()}")
    print(f"10 - 4 = {calc.subtract()}")
    print(f"10 * 4 = {calc.multiply()}")
    print(f"10 / 4 = {calc.divide()}")

    # Exceptions:
    # Division by ZERO
    calc_zero = Calculator(10, 0)
    try:
        print(calc_zero.divide())
    except ZeroDivisionError as err:
        print(f"Caught exception: {err}")

    # Handling invalid input
    for bad_input in (float("nan"), float("inf"), True, "abc"):
        try:
            Calculator(bad_input, 5)  # type: ignore[arg-type]
        except ValueError as err:
            print(f"Caught exception: {bad_input!r}: {err}")

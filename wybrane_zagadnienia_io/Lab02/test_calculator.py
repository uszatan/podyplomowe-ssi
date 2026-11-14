# pylint: disable=missing-module-docstring, missing-function-docstring

import pytest
from calculator import Calculator, is_valid_number


# Test is_valid_number - valid input

@pytest.mark.parametrize(
    "valid_val",
    [
        0,
        -1,
        42,
        3.14,
        -0.001,
        0.0,
        1e10
    ]
)
def test_is_valid_number_accepts_finite_numbers(valid_val):
    assert is_valid_number(valid_val) is True

# Test is_valid_number - invalid input

@pytest.mark.parametrize(
    "invalid_val",
    [
        True, False, "10",  None,
        [1, 2],
        {"a": 1},
        float("nan"),
        float("inf"),
        float("-inf"),
    ],
)
def test_is_valid_number_rejects_invalid_values(invalid_val):
    assert is_valid_number(invalid_val) is False


# Testing the init operator 1

@pytest.mark.parametrize(
    "bad_input",
    [
        "5",
        None,
        True,
        False,
        float("nan"),
        float("inf"),
        float("-inf"),
    ],
)
def test_calculator_init_rejects_invalid_op1(bad_input):
    with pytest.raises(ValueError, match="Operands must be finite numbers"):
        Calculator(bad_input, 10)  # type: ignore[arg-type]

# Testing the init operator 2

@pytest.mark.parametrize(
    "bad_input",
    [
        "5",
        None,
        True,
        False,
        float("nan"),
        float("inf"),
        float("-inf"),
    ],
)
def test_calculator_init_rejects_invalid_op2(bad_input):
    with pytest.raises(ValueError, match="Operands must be finite numbers"):
        Calculator(10, bad_input)  # type: ignore[arg-type]


# Test - SUM operation

@pytest.mark.parametrize(
    ("op1", "op2", "expected"),
    [
        (10, 5, 15),
        (-10, 5, -5),
        (-10, -5, -15),
        (0, 0, 0),
        (0.1, 0.2, pytest.approx(0.3)),
    ],
)
def test_sum(op1, op2, expected):
    assert Calculator(op1, op2).sum() == expected

# Test - SUB operation

@pytest.mark.parametrize(
    ("op1", "op2", "expected"),
    [
        (10, 5, 5),
        (5, 10, -5),
        (-10, -5, -5),
        (0, 0, 0),
        (0.3, 0.1, pytest.approx(0.2)),
    ],
)
def test_subtract(op1, op2, expected):
    assert Calculator(op1, op2).subtract() == expected

# Test - MUL operation

@pytest.mark.parametrize(
    ("op1", "op2", "expected"),
    [
        (10, 5, 50),
        (-10, 5, -50),
        (-10, -5, 50),
        (10, 0, 0),
        (0, 10, 0),
        (2.5, 0.4, pytest.approx(1.0)),
    ],
)
def test_multiply(op1, op2, expected):
    assert Calculator(op1, op2).multiply() == expected

# Test - DIV operation

@pytest.mark.parametrize(
    ("op1", "op2", "expected"),
    [
        (10, 4, pytest.approx(2.5)),
        (-10, 2, -5.0),
        (-10, -2, 5.0),
        (0, 5, 0.0),
        (1, 3, pytest.approx(0.3333333)),
    ],
)
def test_divide(op1, op2, expected):
    assert Calculator(op1, op2).divide() == expected


# test - divide by ZERO

@pytest.mark.parametrize("zero_divisor", [0, 0.0, -0.0])
def test_divide_by_zero_raises_error(zero_divisor):
    calc = Calculator(10, zero_divisor)
    with pytest.raises(ZeroDivisionError, match="Please do not divide by zero!"):
        calc.divide()

@pytest.mark.parametrize(
    ("a", "b", "expected"),
    [
        (2, 3, 5),
        (-1, -2, -3),
        (2.5, 3.5, 6.0),
    ],
)
def test_add_parametrized(a, b, expected):
    calc = Calculator(a, b)
    assert calc.sum() == expected

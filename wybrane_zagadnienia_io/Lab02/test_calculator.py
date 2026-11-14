import pytest

from calculator import Calculator

def test_sum():
    calc = Calculator(10, 5)
    assert calc.sum() == 15


def test_substract():
    calc = Calculator(10, 5)
    assert calc.substract() == 5


def test_multiply():
    calc = Calculator(10, 5)
    assert calc.multiply() == 50


def test_divide():
    calc = Calculator(10, 4)
    assert calc.divide() == pytest.approx(2.5)

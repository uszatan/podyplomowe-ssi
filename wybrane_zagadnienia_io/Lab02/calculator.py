"""Module providing a simple Calculator class for basic arithmetic operations."""
import math
NUMBER_TYPES = (int, float)

def is_valid_number(val: object) ->bool:
    """Number validator - checks whether the input value is a valid number
    - rejects any types other than FLOAT, INT
    - rejects BOOL
    - reject Inf"""
    return isinstance(val, NUMBER_TYPES) and not isinstance(val, bool) and math.isfinite(val)

class Calculator:
    """Simple calculator performing a basic arithmetic operations
    Attributes:
        op1: first number
        op2: second number
    """
    def __init__(self, op1: float, op2: float):
        """Initializing calculator for 2 real numbers"""
        if not is_valid_number(op1) or not is_valid_number(op2):
            raise ValueError("Operands must be finite numbers.")
        self.op1 = op1
        self.op2 = op2

    def sum(self) ->float:
        """Returns SUM"""
        return self.op1+self.op2

    def subtract(self) ->float:
        """Returns SUB"""
        return self.op1-self.op2

    def multiply(self) ->float:
        """Returns Multiplication"""
        return self.op1*self.op2

    def divide(self) ->float:
        """Returns DIV"""
        if self.op2 == 0:
            raise ZeroDivisionError("Please do not divide by zero!")
        return self.op1/self.op2

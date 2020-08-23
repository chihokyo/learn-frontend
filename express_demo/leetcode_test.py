# from collections import Counter


# x = {"apple":1,"banana":4}
# y = {"apple":1,"banana":3}
# test = Counter(x) - Counter(y)
# print(test)
# print(bool(test))

# def function(x){
#     return x * 2
# }


# def func(x):
#     return x * 2
# print(func(3))

# func = lambda x: x * 2
# print(func(3))


# def is_odd(n):
#     return n % 2 == 1

# tmplist = filter(lambda x: x%2==1,[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# def is_odd(n):
#     return n % 2 == 1
 
# tmplist = filter(lambda x: x%2==1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
# print(tmplist)

# def is_odd(n):
#     return n % 2 == 1
 
# tmplist = filter(is_odd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
# print(tmplist)

# tmplist = filter( lambda x: x % 2 == 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
# print(tmplist)

# from functools import reduce
# from operator import mul
# array = [3, 4, 5]

# print(reduce(mul, array,3))

def is_odd(n):
    return n % 2 == 1
tmplist = filter(is_odd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print(tmplist) # 
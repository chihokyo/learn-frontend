
# class Solution:
#     def sortArrayByParityII(self, A: List[int]) -> List[int]:
#         newA = []
#         for i in range(len(A)):
#             if A[i] % 2 == 0:
#                 newA.insert(2*i, A[i])
#             else:
#                 newA.insert(2*i+1, A[i])
#         return newA
    
# fun = Solution()
# fun.sortArrayByParityII(A=[8,9,1,6,4,5])


""" 我知道问题出在哪里了，
这是一个如果i是1的情况下那么2就是2 2i就是三了。但是按照道理说，第二个应该排在第二个才对。
我的index设置的想法不太对应该是按照间隔的想法来的。按照官方的2种做法。
 """
 
class Solution(object):
    def sortArrayByParityII(self, A):
        lenA = len(A)
        ans = []
        t = 0
        for i,x in enumerate(A):
            if x % 2 == 0:
                ans[t] = x
                t += 2
        t = 1
        for i,x in enumerate(A):
            if x % 2 == 1:
                ans[t] = x
                t +=2
        return ans 
fun = Solution()
print(fun.sortArrayByParityII(A=[8,9,1,6,4,5]))

""" 这样写会出现一个错误
IndexError: list assignment index out of range
    ans[t] = x
Line 8 in sortArrayByParityII (Solution.py)
    ret = Solution().sortArrayByParityII(param_1)
Line 38 in _driver (Solution.py)
    _driver()
Line 51 in <module> (Solution.py) 

这样写法才是对的"""

class Solution:
    def sortArrayByParityII(self, A: List[int]) -> List[int]:
        lenA = len(A)
        ans = [None] * lenA
        t = 0
        for i, x in enumerate(A):
            if x % 2 == 0:
                ans[t] = x
                t += 2
        t = 1
        for i,x in enumerate(A):
            if x % 2 == 1:
                ans[t] = x
                t +=2
        return ans 

""" 还有另一种写法，是不会占用这么多空间的。
上面的做法完全就是复制了一份数据。
思路就是，先遍历奇数index的数组，这样一直向下，如果index为奇数但是值是偶数的话，就找偶数
然后在找index为偶数但是值不为偶数的这个数字，上下两者进行交换。
就可以做出来正确答案了。这样就不用浪费一分空间了 """
class Solution(object):
    def sortArrayByParityII(self, A):
       j = 1
       for i in range(0,len(A),2):
           if A[i] % 2:
                while A[j] % 2:
                    j += 2
                A[i], A[j] = A[j], A[i]
        return A
                
""" 看评论学到的
虽然说了是非负整数，但还是不要用%2 == 1判断奇数
负数模2时，若为奇数则为负数不为1 用a%2！=0 这样更准确 """

""" PS
官方还给了另一种写法。关于第一个的 """
class Solution:
    def sortArrayByParityII(self, A: List[int]) -> List[int]:
        ans = [None] * len(A)
        ans[::2] = (x for x in A if x % 2 == 0) # 0,2,4,6...
        ans[1::2] = (x for x in A if x % 2 == 1) # 1,3,5,7...
        return ans
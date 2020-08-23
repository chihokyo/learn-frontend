'''
我写的思路，通过了。
还有一种思路就是先排序，然后减掉第一个和最后一个，然后想加除以长度-2
总体来说这一题蛮简单的，所以技术含量也少。
https://leetcode-cn.com/problems/average-salary-excluding-the-minimum-and-maximum-salary/comments/
PS：顺便复习了一下在py里如何删除元素，通过index和value是不同的删除方法
https://blog.csdn.net/weixin_42814873/article/details/83377431?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
python中对列表list遍历的过程中删除元素4种方法
https://blog.csdn.net/a1007720052/article/details/82911824?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
'''

class Solution:
    def average(self, salary: List[int]) -> float:
        min_sa = min(salary)
        max_sa = max(salary)
        salary.remove(min_sa)
        salary.remove(max_sa)
        return sum(salary)/len(salary)

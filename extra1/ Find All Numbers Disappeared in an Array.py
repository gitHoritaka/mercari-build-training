class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        setmap = set()
        rev = []
        for i in nums:
            setmap.add(i)
        for i in range(1,len(nums)+1):
            if i in setmap:
                pass
            else:
                rev.append(i)
        return rev
        
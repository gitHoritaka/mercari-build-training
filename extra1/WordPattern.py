from collections import defaultdict
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        memo = defaultdict(str)
        appeard = set()
        s = list(s.split(" "))
        if len(pattern) != len(s):
            return False
        for p,ss in zip(pattern,s):
            if memo[p] != "":
                if memo[p] == ss:
                    pass
                else:
                    return False
            else:
                if ss in appeard:
                    return False
                memo[p] = ss
                appeard.add(ss)
        return True
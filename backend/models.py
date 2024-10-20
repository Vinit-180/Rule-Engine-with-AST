class Node:
    def __init__(self,type,left=None,right=None,value=None):
        self.type=type
        self.left=left
        self.right=right
        self.value=value


    def to_dict(self):
        return {
            "type":self.type,
            "value":self.value,
            "left":self.left.to_dict() if self.left else None,
            "right":self.right.to_dict() if self.right else None
        }

    @staticmethod
    def from_dict(data):
        if not data:
            return None
        # left=Node.from_dict(data.get('left'))
        # right=Node.from_dict(data.get('right'))
        try:
            left = Node.from_dict(data.get('left')) if data.get('left') else None
            right = Node.from_dict(data.get('right')) if data.get('right') else None
            print(data)
            return Node(type=data['type'],value=data['value'],left=left,right=right)
        except Exception as e:
            print(e)
            raise Exception(e)

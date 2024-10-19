from models import Node
import ast
import re
from collections import Counter

def create_rule(rule_string):
    try:
        print(rule_string,"________________---")
        # replace AND with and , OR with or
        rule_string = rule_string.replace("AND", "and").replace("OR", "or") 
        
        # Use regex to replace `=` with `==` 
        rule_string = re.sub(r'(?<!\!)=', '==', rule_string) 
        parsed_rule=ast.parse(rule_string,mode='eval')

        print(parsed_rule)
        root=build_ast_from_parsed(parsed_rule.body)
        return root.to_dict()
    except Exception as e:
        raise Exception(f"Error while parsing rule: {str(e)}")
    

def build_ast_from_parsed(parsed_node):
    if isinstance(parsed_node, ast.BoolOp):  # AND/OR
        # print(parsed_node,"<<<<<>>>",parsed_node.values[0],parsed_node.values[1])
        op = "AND" if isinstance(parsed_node.op, ast.And) else "OR"
        return Node(type="operator",value=op, left=build_ast_from_parsed(parsed_node.values[0]), right=build_ast_from_parsed(parsed_node.values[1]))
    elif isinstance(parsed_node,ast.Compare): #Comparison
        left=parsed_node.left.id if isinstance(parsed_node.left,ast.Name) else None # age
        op=parsed_node.ops[0].__class__.__name__
        right=parsed_node.comparators[0].n
        # print(parsed_node.comparators[0].n,parsed_node.comparators[0].s)
        # print(op,"OPERAND")
        return Node(type="operand",value=f'{left} {op} {right}')
    else:
        raise Exception("Unsupported Rule")


def evaluate_rule(rule_ast,data):
    if rule_ast.type=='operator':
        left=evaluate_rule(rule_ast.left,data)
        right=evaluate_rule(rule_ast.right,data)
        if rule_ast.value=='AND':
            return left and right
        return left or right
    
    elif rule_ast.type=='operand':
        field,op,value=rule_ast.value.split()
        # print("---",rule_ast.value)
        field_value=data.get(field)
        if op=='Gt':
            return field_value>int(value)
        elif op=='Lt':
            return field_value<int(value)
        elif op=='Eq':
            return field_value==value
        else:
            return False
    return False
    

def combine_rules(rules):
    if not rules:
        return None
    try:
        most_frequent_operator=count_operators(rules)
        formatted_rules = list(rules.split(","))
        rules=[rule.strip() for rule in formatted_rules]
        print(rules)
        combined_ast = None

        for rule_string in rules:
            rule_string = rule_string.replace("AND", "and").replace("OR", "or") 
            rule_string = re.sub(r'(?<!\!)=', '==', rule_string) 
            parsed_rule=ast.parse(rule_string,mode='eval')

            print(parsed_rule)
            rule_ast=build_ast_from_parsed(parsed_rule.body)
            # rule_ast = create_rule(rule_string)

            # If it's the first rule, assign it as the combined_ast
            if combined_ast is None:
                combined_ast = rule_ast
            else:
                # Combine using the most frequent operator
                combined_ast = Node(
                    type=most_frequent_operator.lower(),  # 'and' or 'or'
                    left=combined_ast,
                    right=rule_ast
                )
        return combined_ast.to_dict()
    
    except Exception as e:
        raise Exception("Incorrect data format")
    
def count_operators(rule_strings):
    operator_counter = Counter()
    for rule in rule_strings:
        if "AND" in rule:
            operator_counter["AND"] += 1
        if "OR" in rule:
            operator_counter["OR"] += 1
    # Return the most common operator (default to 'AND' if tie or no occurrence)
    return operator_counter.most_common(1)[0][0] if operator_counter else "AND"

    # if not node:
    #     return
    # if node.type in ['and', 'or']:
    #     operator_counts[node.node_type] += 1
    #     count_operators(node.left, operator_counts)
    #     count_operators(node.right, operator_counts)
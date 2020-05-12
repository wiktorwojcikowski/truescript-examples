

export class Operation {
    public steps: Array<Object>;
    
    constructor(steps : Array<Object>) {
        this.steps = steps;
    }

    apply(string) {
      let position = 0;
      let str = string;
      this.steps.forEach((step) => {
        if('move' in step) {
          position = position + step['move'];
        } else if('insert' in step) {
          str = [str.slice(0, position), step['insert'], str.slice(position)].join('');
          position = position + step['insert'].length;
        } else if('delete' in step) {
          str = [str.slice(0, position), str.slice(position + step['delete'])].join('');
        }
      });
      return str;
    }

    combine(op) {
      const newOp = Operation.combine(this, op); 
      this.steps = newOp.steps;
    }

    static combine(op1, op2) {
      let i1 = 0;
      let i2 = 0;
      let steps = [];
      let moved1 = 0;
      let moved2 = 0;
      while(i1 < op1.steps.length || i2 < op2.steps.length) {
        if (i1 < op1.steps.length && !('move' in op1.steps[i1])) {
          if('delete' in op1.steps[i1]) {
            if(op1.steps[i1]['delete'] - moved2 > 0) {
              steps.push({delete: op1.steps[i1]['delete'] - moved2});
              moved1 = moved1 + op1.steps[i1]['delete'];
              moved2 = 0;
            } else {
              moved2 = moved2 - op1.steps[i1]['delete'];
            }
          } else {
            steps.push(op1.steps[i1]);
          }
          i1++;
        }
        else if (i2 < op2.steps.length && !('move' in op2.steps[i2])) {
          if('delete' in op2.steps[i2]) {
            if(op2.steps[i2]['delete'] - moved1 > 0) {
              steps.push({delete: op2.steps[i2]['delete'] - moved1});
              moved2 = moved2 + op2.steps[i2]['delete'];
              moved1 = 0;
            } else {
              moved1 = moved1 - op2.steps[i2]['delete'];
            }
          } else {
            steps.push(op2.steps[i2]);
          }
          i2++;
        }
        else if (i1 < op1.steps.length && ((i2 >= op2.steps.length) || op1.steps[i1]['move'] <= op2.steps[i2]['move'])) {
          if(op1.steps[i1]['move'] - moved2 > 0) {
            steps.push({move: op1.steps[i1]['move'] - moved2});
            moved1 = op1.steps[i1]['move'];
            moved2 = 0;
          } 
          else {
            moved2 = moved2 - op1.steps[i1]['move'];
          }
          i1++;
        }
        else {
          if(op2.steps[i2]['move'] - moved1 > 0) {
            steps.push({move: op2.steps[i2]['move'] - moved1});
            moved2 = op2.steps[i2]['move'];
            moved1 = 0;
          } 
          else {
            moved1 = moved1 - op2.steps[i2]['move'];
          }
          i2++;
        }
      }
      return new Operation(steps);
    }
}

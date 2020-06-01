function NumberOf1(n)
{
    // write code here
    var count = 0,flag=1;
    while(flag){
        if(n&flag)count++;
        flag=flag<<1;
    }
    return count;
}

console.log(NumberOf1(-1));

function test(a,b = a,c = 3) {
    console.log(a, b, c);
}

test(1, undefined);
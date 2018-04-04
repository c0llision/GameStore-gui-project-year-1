coupons = [
    ['10off', 10],
    ['20off', 20],
]


function getCouponDiscount(code)
{
    code = code.toLowerCase().trim();
    for (var i=0; i < coupons.length;i++)
    {
        if (coupons[i][0] == code)
        {
            return coupons[i][1];
        }
    }
    return 0;
}

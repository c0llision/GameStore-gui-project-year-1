/*  coupon.js
    Coupon functionality */



function getCouponDiscount(code)
{
    /* get the discount associated with the code

      {param} code - string - Discount code
      {return} int - Percentage discount or 0 if no discount */

    coupons = [
        ['10off', 10],
        ['20off', 20],
    ]

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

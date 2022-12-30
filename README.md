<!-- for MCQ with 'Other' as option -->

const checkarrayforOtherValues = (arr = [], key) => {
let j = 1;
arr.map(el => {
if (el.value === 'Others') {
if (!el.hasOwnProperty('other') || !el.other) {
j = 0;
}
}
});
return j;
};

<!--scq On selecting Yes/No/Other/Reason textbox opens up -->

let answer = are_any_other_organizations_active_in_the_basti?.value === 'Yes' &&
!are_any_other_organizations_active_in_the_basti?.other
? 0
: !are_any_other_organizations_active_in_the_basti?.value
? 0
: 1;

<!-- mcq on yes/ no / other -->

let ans5 =
!still_associated_with_the_center ||
(still_associated_with_the_center?.value === 'Yes' &&
still_associated_with_the_center_reasons.length === 0)
? 0
: 1;

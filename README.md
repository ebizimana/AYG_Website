# AYG_Website
The website for The AYG app

quiz 1  -  100
quiz 2  -  100 
quiz 3  -  100
quiz 4  -  100
quiz 5  -  100 

Quiz Average = (450/5) = 90
Quiz Overall = 90 * (40/100) = 36

Test 1  -  100
Test 2  -  100
Test 3  -  100 

Test Average = (270/3) = 90
Test Overall = 90 * (30/100)= 27

Exam 1  -  100
Exam 2  -  100 

Exam Average = (180/2) = 90
Exam Overall = 90 * (30/100)= 27

# Test Scenarios 
- All assignments have no categories (Purple)
    - If the first assignment doesn't belong to a category: 
        - The class status color should indicate that
        - It should make sure every class from that point doesn't belong to a category 
            - if one class belong to a category: 
                - Change class status color to "Red"
                - disable all the assignments that don't belong to a category
                - Disable the Submit button, until all assignments belong to a category
                - Change class status color to "Green"
            - Or 
                - Delete the assignment that belong to a category 
                - Change the class status color from "Red" to back to "Purple"

- Mixed assignments (some have categories and some don't have categories) (Red)
    - This is an error state: a class either is calculated by point average or category weight
    - A class can only enter in this state if you add a categories to a point average class (purple class)
    - Follow the steps above to correct 
- All assignments have categories (Green)

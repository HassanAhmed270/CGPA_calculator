document.addEventListener("DOMContentLoaded", function () {
    let criteria = '';
    let line = document.getElementById('tab');

    // Event delegation for clicking inside table body
    line.addEventListener('click', function (e) {
    if (e.target.tagName !== "TD") return;
    try {
        let main = document.querySelector('.main');
        let form = main.querySelector('.container');
        form.innerHTML = `
       <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="relative bg-white rounded-xl shadow-lg w-[40%] p-8">
    <!-- Close Button -->
    <button onclick="closeForm()"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>

    <!-- Form Content -->
    <div class="mb-4">
      <label class="text-xl block text-sm font-medium text-gray-700 mb-1">Subject</label>
      <input type="text" id="subject" placeholder="Subject Name"
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
      <label class="text-xl block text-sm font-medium text-gray-700 mb-1">Marks</label>
      <input type="text" id="marks" placeholder="Marks"
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
      <label class="text-xl block text-sm font-medium text-gray-700 mb-1">Credit Hours</label>
      <input type="text" id="credit" placeholder="Credit Hours"
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="mb-4">
      <label class="text-xl block text-sm font-medium text-gray-700 mb-1">Overall</label>
      <input type="text" id="overall" placeholder="Overall"
        class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <button class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onclick="addToTable()">Add</button>
  </div>
</div>

        `;

        form.classList.remove('hidden');
    }catch (err) {
        console.error("Error showing form:", err);
    }
    });


    window.closeForm=function () {
    document.querySelector('.fixed').style.display = 'none';
  }
    window.selectMethod = function (value) {
        console.log("Hello");
        console.log(criteria = value);

        // template section hide
        document.querySelector('.temp').classList.add('hidden');

        // main calculator show
        document.querySelector('.main').classList.remove('hidden');
    };

    window.addToTable = function () {
        try{
            let subject = document.getElementById("subject").value.trim();
        let marks = parseFloat(document.getElementById("marks").value.trim());
        let credit = parseFloat(document.getElementById("credit").value.trim());
        let overall = parseFloat(document.getElementById("overall").value.trim());

        if (subject === "" || isNaN(marks) || isNaN(credit) || isNaN(overall)) {
    alert("Please fill all fields correctly.");
    return;
}


        let percent = (marks / overall) * 100;
        let gpa;

        switch (criteria) {
            case "I": // International criteria
                if (percent >= 86) gpa = 4.0;
                else if (percent >= 80) gpa = 3.66;
                else if (percent >= 75) gpa = 3.33;
                else if (percent >= 70) gpa = 3.0;
                else if (percent >= 67) gpa = 2.66;
                else if (percent >= 63) gpa = 2.33;
                else if (percent >= 60) gpa = 2.0;
                else if (percent >= 57) gpa = 1.66;
                else if (percent >= 54) gpa = 1.33;
                else if (percent >= 50) gpa = 1.0;
                else gpa = 0.0;
                break;

            case "P": // Pakistan criteria
                if (percent >= 90) gpa = 4.0;
                else if (percent >= 80) gpa = 3.75;
                else if (percent >= 75) gpa = 3.5;
                else if (percent >= 70) gpa = 3.0;
                else if (percent >= 65) gpa = 2.5;
                else if (percent >= 60) gpa = 2.0;
                else if (percent >= 55) gpa = 1.5;
                else if (percent >= 50) gpa = 1.0;
                else gpa = 0.0;
                break;

            case "L": // Latest / Both
                if (percent >= 90) gpa = 4.0;
                else if (percent >= 80) gpa = 3.75;
                else if (percent >= 75) gpa = 3.5;
                else if (percent >= 70) gpa = 3.0;
                else if (percent >= 65) gpa = 2.5;
                else if (percent >= 60) gpa = 2.0;
                else if (percent >= 55) gpa = 1.5;
                else if (percent >= 50) gpa = 1.0;
                else gpa = 0.0;
                break;

            default:
                alert("Invalid criteria selected.");
                return;
        }
        // Generate a unique ID for the row
let idNo = "row_" + Math.floor(Math.random() * 100000);
        const tableBody = document.getElementById("tab");
        const blankRow = document.getElementById("BlankRow");
        if (blankRow) {
            tableBody.removeChild(blankRow);
        }

        tableBody.insertAdjacentHTML("afterbegin", `
        <tr id="${idNo}" class="text-center hover:bg-gray-500">
    <td class="cell">${subject}</td>
    <td class="cell">${marks}</td>
    <td class="cell">${credit}</td>
    <td class="cell">${gpa.toFixed(2)}</td>
    <td class="cell">
        <button class="delete-btn bg-red-600 text-large px-4 py-1 " onclick="deleteRow('${idNo}')">Delete</button>
    </td>
</tr>
        `);

        document.querySelector(".container").classList.add("hidden");
        document.querySelector('.templates')?.remove();
    }catch (err) {
        console.error("Error adding to table:", err);
        alert("Something went wrong while adding the data. Check console for details.");
    }
}

    window.calCGPA = function () {
       try{
       const rows = document.querySelectorAll('#tab tr');
        let totalPoints = 0;
        let totalCredits = 0;

        rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        // Skip rows that don't have exactly 5 cells (like header or "Add New" row)
        if (cells.length !== 5) return;

        // Skip row if it has an ID of "addnew"
        if (row.id === 'addnew') return;

        const creditHour = parseFloat(cells[2].innerText.trim());
        const gpa = parseFloat(cells[3].innerText.trim());

        if (!isNaN(creditHour) && !isNaN(gpa)) {
            totalPoints += creditHour * gpa;
            totalCredits += creditHour;
        } else {
            console.warn("Invalid data in row, skipping:", row);
        }
    });

        const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

        const resultContainer = document.getElementById('ccgpa');

        // Remove any existing <h3> tags inside the container
        const oldHeading = resultContainer.querySelector('h3');
        if (oldHeading) {
            oldHeading.remove();
        }

        // Append new <h3> without removing other HTML
        resultContainer.insertAdjacentHTML('beforeend', `<h3 class="text-xl font-bold text-blue-700">Your CGPA is: ${cgpa}</h3>`);

        resultContainer.classList.remove('hidden');
    } catch (err) {
        console.error("Error calculating CGPA:", err);
        alert("Unable to calculate CGPA. Check console for details.");
    }
    };
    // Improved delete function
window.deleteRow = function (rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();
    }
};
});

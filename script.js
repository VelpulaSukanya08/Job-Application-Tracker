// Get elements from HTML
const applicationForm = document.getElementById("applicationForm");
const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const dateInput = document.getElementById("date");
const statusInput = document.getElementById("status");
const applicationList = document.getElementById("applicationList");
const searchInput = document.getElementById("search");

// Statistics
const totalApplications = document.getElementById("totalApplications");
const appliedCount = document.getElementById("appliedCount");
const shortlistedCount = document.getElementById("shortlistedCount");
const selectedCount = document.getElementById("selectedCount");

// Load saved applications
let applications = JSON.parse(localStorage.getItem("applications")) || [];


// Display applications
function displayApplications(data = applications) {

    applicationList.innerHTML = "";

    if (data.length === 0) {

        applicationList.innerHTML = `
            <div class="empty-message">
                <p>No applications found.</p>
            </div>
        `;

        updateStatistics();
        return;
    }


    data.forEach(function(application) {

        const card = document.createElement("div");

        card.className = "application-card";

        let statusClass = "";

        if (application.status === "Applied") {
            statusClass = "status-applied";
        }
        else if (application.status === "Shortlisted") {
            statusClass = "status-shortlisted";
        }
        else if (application.status === "Selected") {
            statusClass = "status-selected";
        }
        else if (application.status === "Rejected") {
            statusClass = "status-rejected";
        }


        card.innerHTML = `

            <div class="application-info">

                <h3>${application.company}</h3>

                <p>
                    <strong>Role:</strong>
                    ${application.role}
                </p>

                <p>
                    <strong>Applied Date:</strong>
                    ${application.date}
                </p>

            </div>


            <div>

                <span class="status ${statusClass}">
                    ${application.status}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteApplication(${application.id})"
                >
                    Delete
                </button>

            </div>

        `;

        applicationList.appendChild(card);

    });


    updateStatistics();
}


// Add new application
applicationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const newApplication = {

        id: Date.now(),

        company: companyInput.value.trim(),

        role: roleInput.value.trim(),

        date: dateInput.value,

        status: statusInput.value

    };


    applications.push(newApplication);


    // Save to browser
    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    // Clear form
    applicationForm.reset();


    // Display updated list
    displayApplications();

});


// Delete application
function deleteApplication(id) {

    applications = applications.filter(function(application) {

        return application.id !== id;

    });


    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );


    displayApplications();

}


// Search applications
searchInput.addEventListener("input", function() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredApplications =
        applications.filter(function(application) {

            return (
                application.company
                    .toLowerCase()
                    .includes(searchText)
                ||
                application.role
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    displayApplications(filteredApplications);

});


// Update statistics
function updateStatistics() {

    totalApplications.textContent =
        applications.length;


    const applied =
        applications.filter(function(application) {

            return application.status === "Applied";

        }).length;


    const shortlisted =
        applications.filter(function(application) {

            return application.status === "Shortlisted";

        }).length;


    const selected =
        applications.filter(function(application) {

            return application.status === "Selected";

        }).length;


    appliedCount.textContent = applied;

    shortlistedCount.textContent = shortlisted;

    selectedCount.textContent = selected;

}


// Display saved applications when page opens
displayApplications();
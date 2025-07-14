document.addEventListener("DOMContentLoaded", () => {
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  const users = JSON.parse(localStorage.getItem("user")) || [];
  const currentUser = users.find((user) => user.email === loggedInEmail);
  const companyNameInput = document.getElementById("company-name");
  const appliedPositionInput = document.getElementById("position");
  const applicationUrlInput = document.getElementById("applied-url");
  const appliedDateInput = document.getElementById("date-applied");
  const createBtn = document.getElementById("submit-btn");
  const leftSection = document.getElementById("left-section");
  const applicationCardsUl = document.getElementById("application-cards");
  const alertMessage = document.getElementById("alert-msg");
  if (currentUser) {

  } else {
    setTimeout(() => {
      window.location.href = "login.html";
    }, 500)
  }
  const savedCards = JSON.parse(localStorage.getItem("jobCards")) || [];
  const cardsCreated = [];
  if (savedCards.length > 0) {
    leftSection.classList.remove("hidden");
    savedCards.forEach((card) => {
      cardsCreated.push(card);
      renderCards(card);
    });
  } else {
    leftSection.classList.add("hidden");
  }
  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const companyName = companyNameInput.value.trim();
    const positionApplied = appliedPositionInput.value.trim();
    const applicationUrl = applicationUrlInput.value.trim();
    const appliedDate = appliedDateInput.value.trim();
    if (!applicationUrl.startsWith('http://') && !applicationUrl.startsWith('https://')) {
      applicationUrl = 'https://' + applicationUrl;
    }
    const applicationForm = {
      id: Date.now(),
      companyName,
      positionApplied,
      applicationUrl,
      appliedDate,
      status: "Applied",
    };
    console.log(applicationForm);
    const alreadyExists = cardsCreated.some(
      (card) => card.applicationUrl === applicationUrl
    );

    if (alreadyExists) {
      alertMessage.textContent = "Data already exists!!!!!!!";
      alertMessage.style.removeProperty("display");
      setTimeout(() => {
        companyNameInput.value = "";
        appliedPositionInput.value = "";
        applicationUrlInput.value = "";
        appliedDateInput.value = "";
        alertMessage.style.display = "none";
      }, 2000);
      return; // exit the click handler here
    }

    cardsCreated.push(applicationForm);
    localStorage.setItem("jobCards", JSON.stringify(cardsCreated));

    const originalCardRef = cardsCreated.find(
      (card) => card.id === applicationForm.id
    );
    renderCards(originalCardRef);

    leftSection.classList.remove("hidden");
    companyNameInput.value = "";
    appliedPositionInput.value = "";
    applicationUrlInput.value = "";
    appliedDateInput.value = "";
  });

  //rendering cards
  async function renderCards(applicationForm) {
    const cardsData = await fetchCompanyDetails(applicationForm.companyName);
    const li = document.createElement("li");
    li.setAttribute("data-id", applicationForm.id);

    const editDiv = document.createElement("div");
    editDiv.classList.add("card-edit-btn");
    editDiv.innerHTML = `
                  <svg
                class="w-[21px] h-[21px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
    `;
    li.appendChild(editDiv);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
                  <div class="company-logo">
                <img src="${cardsData.logos[1].formats[0].src}" alt="" />
                <h3 class="company-name">${cardsData.name}</h3>
              </div>
              <h4 class="position">${applicationForm.positionApplied}</h4>
              <p class="date-applied">${formatDate(
      applicationForm.appliedDate
    )}</p>
              <p class="application-status">Status: <span class="status-text">${applicationForm.status
      }</span></p>
              <div class="card-buttons">
                <button class="show-btn">Show</button>
                <button class="dlt-btn">Delete</button>
              </div>
    `;
    li.appendChild(cardDiv);
    applicationCardsUl.appendChild(li);
    // Apply background color based on saved status
    const statusSpan = li.querySelector(".status-text");
    if (statusSpan) {
      statusSpan.style.backgroundColor = defineColor(applicationForm.status);
    }

    editDiv.addEventListener("click", (e) => {
      const card = e.currentTarget.closest("li");
      if (!card) return;
      const status = card.querySelector(".status-text");
      const currentStatus = status.textContent.trim();
      status.textContent = "";
      const select = document.createElement("select");
      // select.setAttribute("id","dropdown")
      const options = ["Applied", "Interview", "Offered", "Rejected"];
      options.forEach((opt) => {
        const option = document.createElement("option");
        option.setAttribute("value", opt);
        option.textContent = opt;
        select.appendChild(option);
      });
      select.value = currentStatus;
      status.appendChild(select);

      //When user selects a new status
      select.addEventListener("change", (e) => {
        const selected = select.value;
        status.style.backgroundColor = defineColor(selected);
        status.textContent = selected;

        const updateId = parseInt(card.getAttribute("data-id"));
        const targetCard = cardsCreated.find((card) => card.id === updateId);
        if (targetCard) {
          targetCard.status = selected;
          localStorage.setItem("jobCards", JSON.stringify(cardsCreated));
        }
      });
    });
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("show-btn")) {
        window.open(applicationForm.applicationUrl);
      }
    });
    cardDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("dlt-btn")) {
        applicationCardsUl.removeChild(li);

        const updatedCards = cardsCreated.filter(
          (card) => card.id !== applicationForm.id
        );
        cardsCreated.length = 0;
        cardsCreated.push(...updatedCards);
        localStorage.setItem("jobCards", JSON.stringify(cardsCreated));

        if (cardsCreated.length === 0) {
          leftSection.classList.add("hidden");
        }
      }
    });
  }
  async function fetchCompanyDetails(query) {
    const clientId = currentUser.api;
    try {
      const response1 = await fetch(
        `https://api.brandfetch.io/v2/search/${query}?c=${clientId}`
      );
      if (!response1.ok) {
        throw new Error("failed to fetch domain name");
      }
      const domainData = await response1.json();
      const domain = domainData[0].domain;
      const companyRes = await fetch(
        `https://api.brandfetch.io/v2/brands/${domain}`,
        {
          headers: {
            Authorization: `Bearer ${clientId}`,
          },
        }
      );
      const finalResponse = await companyRes.json();
      return finalResponse;
    } catch (err) {
      console.log(err);
    }
  }
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }
  function defineColor(text) {
    if (text === "Applied") {
      return "#ffd500ff";
    } else if (text === "Interview") {
      return "#02eafbff";
    } else if (text === "Offered") {
      return "#33fd00ff";
    } else if (text === "Rejected") {
      return "#fd0000ff";
    }
  }
});

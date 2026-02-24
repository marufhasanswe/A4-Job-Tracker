let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');
let jobsCount = document.getElementById('jobs-count');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
let interviewFilterSection = document.getElementById('interview-filter-section');
let rejectedFilterSection = document.getElementById('rejected-filter-section');
let interviewNoJobsAvailable = document.getElementById('interview-no-jobs-available');
let rejectedNoJobsAvailable = document.getElementById('rejected-no-jobs-available');

console.log(currentStatus);

function calculateCount(){
    totalCount.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    if(currentStatus=="all-filter-btn"){
        jobsCount.innerText = totalCount.innerText;
    }
    if(currentStatus=="interview-filter-btn"){
        jobsCount.innerText = interviewCount.innerText;
    }
    if(currentStatus=="rejected-filter-btn"){
        jobsCount.innerText = rejectedCount.innerText;
    }
}
calculateCount()

function toggleStyle(id){
    
    currentStatus = id;
    allFilterBtn.classList.remove('bg-blue-500', 'text-white', 'border-blue-600', "font-semibold")
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white', 'border-blue-600', "font-semibold")
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white', 'border-blue-600', "font-semibold")

    allFilterBtn.classList.add("bg-white-500", "text-gray-500", "border-gray-200")
    interviewFilterBtn.classList.add("bg-white-500", "text-gray-500", "border-gray-200")
    rejectedFilterBtn.classList.add("bg-white-500", "text-gray-500", "border-gray-200")

    document.getElementById(id).classList.add('bg-blue-500', 'text-white', 'border-blue-600','font-semibold');
    
}

mainContainer.addEventListener('click', function(event){
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector('#company-name');
    const designation = parentNode.querySelector('#designation');
    const location = parentNode.querySelector('#location');
    const type = parentNode.querySelector('#type');
    const salary = parentNode.querySelector('#salary');
    let status = parentNode.querySelector('#status');
    const jobDescription = parentNode.querySelector('#job-description');
    
    if(event.target.classList.contains("delete-btn")){
        const removeElement = event.target.parentNode.parentNode;
        const companyName = removeElement.querySelector('#company-name').innerText;
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        removeElement.remove();
        if(currentStatus === "interview-filter-btn"){
            renderInterview();
        }
        if(currentStatus === "rejected-filter-btn"){
            renderRejected();
        }
        calculateCount();
    }

    let cardInfo = {
        companyName : companyName.innerText,
        designation : designation.innerText, 
        location : location.innerText, 
        type : type.innerText, 
        salary : salary.innerText,
        jobDescription: jobDescription.innerText
    };

    const interviewExist = interviewList.find(item => item.companyName == cardInfo.companyName)
    const rejectedExist = rejectedList.find(item => item.companyName == cardInfo.companyName)
    if(event.target.classList.contains('interview-btn')){
        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);
        if(!interviewExist){
            interviewList.push(cardInfo);
        }
        status.innerText = "INTERVIEW";
        if(currentStatus == "rejected-filter-btn"){
            renderRejected();
        }
    }
    else if(event.target.classList.contains('rejected-btn')){

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);
        if(!rejectedExist){
            rejectedList.push(cardInfo);
        }
        status.innerText = "REJECTED";
        if(currentStatus == "interview-filter-btn"){    
            renderInterview();
        }
    }
    if(event.target.classList.contains('all-filter-btn')){
        interviewFilterSection.classList.add('hidden');
        rejectedFilterSection.classList.add('hidden');
        allCards.classList.remove('hidden');
    }
    if(event.target.classList.contains('interview-filter-btn')){
        interviewFilterSection.classList.remove('hidden');
        allCards.classList.add('hidden');
        rejectedFilterSection.classList.add('hidden');
        renderInterview();
    }
    if(event.target.classList.contains('rejected-filter-btn')){
        interviewFilterSection.classList.add('hidden');
        allCards.classList.add('hidden');
        rejectedFilterSection.classList.remove('hidden');
        jobsCount.innerText = rejectedCount.innerText;
        renderRejected();
    }
calculateCount()
    
})
function renderInterview(){
    interviewFilterSection.innerHTML = '';
    if(interviewList.length == 0){
        interviewFilterSection.appendChild(interviewNoJobsAvailable);
    }
    for(let interview of interviewList){
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="card p-6 bg-white flex justify-between rounded-lg">
          <div>
            <h3 id="company-name" class="text-2xl font-semibold text-[#002C5C]">
              ${interview.companyName}
            </h3>
            <p id="designation" class="text-[#64748B] mt-1">
              ${interview.designation}
            </p>
            <div
              class="text-[#64748B] mt-5 mb-5 text-sm flex items-center gap-2"
            >
              <p id="location">${interview.location}</p>
              <p class="w-1 h-1 bg-[#64748B] rounded-full"></p>
              <p id="type">${interview.type}</p>
              <p class="w-1 h-1 bg-[#64748B] rounded-full"></p>
              <p id="salary">${interview.salary}</p>
            </div>
            <button id="status" class="text-[#002C5C] px-3 py-2 bg-[#EEF4FF] rounded">
              INTERVIEW
            </button>
            <p id="job-description" class="text-[#323B49] mt-2 mb-5 text-sm">
              ${interview.jobDescription}
            </p>
            <div class="flex gap-2">
              <button
                class="interview-btn text-[#10B981] border border-[#10B981] px-3 py-2 font-semibold text-sm rounded cursor-pointer"
              >
                INTERVIEW
              </button>
              <button
                class="rejected-btn text-[#EF4444] border border-[#EF4444] px-3 py-2 font-semibold text-sm rounded cursor-pointer"
              >
                REJECTED
              </button>
            </div>
          </div>
          <div>
            <img
              class="delete-btn w-8 p-[5px] flex items-center justify-center self-center rounded-full border border-[#323B49] text-gray-500 cursor-pointer"
              src="Images/Trash.png"
              alt=""
            />
          </div>
        </div>
        `
        
        interviewFilterSection.appendChild(div);
    }
}
function renderRejected(){
    rejectedFilterSection.innerHTML = '';
    if(rejectedList.length == 0){
        rejectedFilterSection.appendChild(rejectedNoJobsAvailable);
    }
    for(let rejected of rejectedList){
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="card p-6 bg-white flex justify-between rounded-lg">
          <div>
            <h3 id="company-name" class="text-2xl font-semibold text-[#002C5C]">
              ${rejected.companyName}
            </h3>
            <p id="designation" class="text-[#64748B] mt-1">
              ${rejected.designation}
            </p>
            <div
              class="text-[#64748B] mt-5 mb-5 text-sm flex items-center gap-2"
            >
              <p id="location">${rejected.location}</p>
              <p class="w-1 h-1 bg-[#64748B] rounded-full"></p>
              <p id="type">${rejected.type}</p>
              <p class="w-1 h-1 bg-[#64748B] rounded-full"></p>
              <p id="salary">${rejected.salary}</p>
            </div>
            <button id="status" class="text-[#002C5C] px-3 py-2 bg-[#EEF4FF] rounded">
              REJECTED
            </button>
            <p id="job-description" class="text-[#323B49] mt-2 mb-5 text-sm">
              ${rejected.jobDescription}
            </p>
            <div class="flex gap-2">
              <button
                class="interview-btn text-[#10B981] border border-[#10B981] px-3 py-2 font-semibold text-sm rounded cursor-pointer"
              >
                INTERVIEW
              </button>
              <button
                class="text-[#EF4444] border border-[#EF4444] px-3 py-2 font-semibold text-sm rounded cursor-pointer"
              >
                REJECTED
              </button>
            </div>
          </div>
          <div>
            <img
              class="delete-btn w-8 p-[5px] flex items-center justify-center self-center rounded-full border border-[#323B49] text-gray-500 cursor-pointer"
              src="Images/Trash.png"
              alt=""
            />
          </div>
        </div>
        `
        rejectedFilterSection.appendChild(div);
    }

}





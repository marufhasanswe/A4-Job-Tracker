let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCards = document.getElementById('all-cards');
const mainContainer = document.querySelector('main');
let interviewFilterSection = document.getElementById('interview-filter-section');
let rejectedFilterSection = document.getElementById('rejected-filter-section');

function calculateCount(){
    totalCount.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount()

function toggleStyle(id){
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
    const companyName = parentNode.querySelector('#company-name').innerText;
    const designation = parentNode.querySelector('#designation').innerText;
    const location = parentNode.querySelector('#location').innerText;
    const type = parentNode.querySelector('#type').innerText;
    const salary = parentNode.querySelector('#salary').innerText;
    let status = parentNode.querySelector('#status');
    const jobDescription = parentNode.querySelector('#job-description').innerText;
    

    let cardInfo = {
        companyName,
        designation, 
        location, 
        type, 
        salary,
        jobDescription
    };

    const interviewExist = interviewList.find(item => item.companyName == cardInfo.companyName)
    const rejectedExist = rejectedList.find(item => item.companyName == cardInfo.companyName)
    if(event.target.classList.contains('interview-btn')){

        if(!interviewExist){
            interviewList.push(cardInfo);
            status.innerText = "INTERVIEW";
        }
    }
    else if(event.target.classList.contains('rejected-btn')){
        if(!rejectedExist){
            rejectedList.push(cardInfo);
            status.innerText = "REJECTED"
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
        renderInterview()
    }
    if(event.target.classList.contains('rejected-filter-btn')){
        interviewFilterSection.classList.add('hidden');
        allCards.classList.add('hidden');
        rejectedFilterSection.classList.remove('hidden');
        renderRejected();
    }

calculateCount()
    
})
function renderInterview(){
    if(interviewList.length == 0){
        return
    }
    interviewFilterSection.innerHTML = '';
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
                class="text-[#10B981] border border-[#10B981] px-3 py-2 font-semibold text-sm rounded cursor-pointer"
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
            <button
              class="w-8 h-8 rounded-full border border-[#323B49] text-gray-500 cursor-pointer"
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        `
        
        interviewFilterSection.appendChild(div);
    }
}
function renderRejected(){
    if(rejectedList == 0){
        return
    }
    rejectedFilterSection.innerHTML = '';
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
                class="text-[#10B981] border border-[#10B981] px-3 py-2 font-semibold text-sm rounded cursor-pointer"
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
            <button
              class="w-8 h-8 rounded-full border border-[#323B49] text-gray-500 cursor-pointer"
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
        `
        
        rejectedFilterSection.appendChild(div);
    }

}



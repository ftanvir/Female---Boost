window.addEventListener("DOMContentLoaded", function () {
  
    // Get the form elements
    var form = document.getElementById("form");

  //add event listener for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    calculateDoses();
  });

  //calculate doses
  function calculateDoses() {

    testosteroneBoost.textContent = "";
    estradiolBoost.textContent = "";
    
    //id ="appendcontent" make innerHTML = ""
    var appendcontent = document.getElementById("appendcontent");
    appendcontent.innerHTML = "";


    if(isCalculatable() ===true) {
        testosteroneBoost.textContent = calculateTestosteroneBoost();
        estradiolBoost.textContent = calculateEstradiolBoost();
        console.log(calculateTestosteroneBoost());
    } else {
        testosteroneBoost.textContent = "0mg";
        estradiolBoost.textContent = "0mg";
        //add a red color paragraph to id = "testosteroneDoseBlock"
        var testosteroneDoseBlock = document.getElementById("appendcontent");
        var testosteroneDoseBlockP = document.createElement("p");
        testosteroneDoseBlockP.textContent = "Consider next full procedure round of pellets instead of a boost.";
        testosteroneDoseBlockP.style.color = "red";
        testosteroneDoseBlock.appendChild(testosteroneDoseBlockP);
        
    }

  }

  //check if the last procedure date is within the last two months from today
  function isCalculatable() {

    var lastProcedureDateInput = document.getElementById("lastProcedureDate");
    var lastProcedureDate = new Date(lastProcedureDateInput.value);
    var currentDate = new Date();
    var twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    if (lastProcedureDate >= twoMonthsAgo && lastProcedureDate <= currentDate) {
        return true;
    } else {
        return false;
    }

    }

    //calculate testosterone boost
    function calculateTestosteroneBoost() {
        //check if id="symptomaticTestosterone" is checked
        var symptomaticTestosterone = document.getElementById("symptomaticTestosterone");
        if (symptomaticTestosterone.checked === true) {
            var testosteronecal = document.getElementById("testosteroneLabs").value;

            if(testosteronecal >=0 && testosteronecal<=99) {
                var val = "75mg";
                return val;
            }
            if(testosteronecal >=100 && testosteronecal<=149) {
                var val = "50mg";
                return val;
            }
            if(testosteronecal >149) {
                var val = "37.5mg";
                return val;
            }
        } else {
            var val = "0mg";
            return val;
        }
    }
    

    //calculate estradiol boost
    function calculateEstradiolBoost() {

        //check if id="firstRoundEstrogen" is checked
        var firstRoundEstrogen = document.getElementById("firstRoundEstrogen");
        if (firstRoundEstrogen.checked === true) {

            var symptomaticEstradiol = document.getElementById("symptomaticEstradiol");
            
            var lastEstrodiolDose = document.getElementById("LED").value;
            // console.log(lastEstrodiolDose);

                var originalFSH = document.getElementById("originalFSH").value;
                var postPelletFSH = document.getElementById("postPelletFSH").value;
                var ratio = originalFSH / postPelletFSH;

                if(lastEstrodiolDose>0) {
                    if(ratio>=2) {
                        var val = "6mg";
                        return val;
                    } 
                    if(ratio<2) {
                        var val = "10mg";
                        return val;
                    }
                }
            
            

        } else {
            var val = "0mg";
            return val;
        }
    }



    
    
});

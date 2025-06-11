var overlayEnabled = false;
var overlayInterval = setInterval(function () {

	if (overlayEnabled)
	{
		addHoveredClassToSectionOverlays();
	}
}, 100);

// --------------------

function removeHoveredClassFromSectionOverlays() {
  // Get all elements with the class "section-overlay"
  const sectionOverlays = document.querySelectorAll('.section-overlay');
  
  let elementsModified = 0;
  
  // Iterate through each element and add the "isHovered" class if not already present
  sectionOverlays.forEach(element => {
    if (element.classList.contains('isHovered')) {
      element.classList.remove('isHovered');
      elementsModified++;
    }
  });
  
  // Return the number of elements modified
  return elementsModified;
}

function addHoveredClassToSectionOverlays() {
  // Get all elements with the class "section-overlay"
  const sectionOverlays = document.querySelectorAll('.section-overlay');
  
  let elementsModified = 0;
  
  // Iterate through each element and add the "isHovered" class if not already present
  sectionOverlays.forEach(element => {
    if (!element.classList.contains('isHovered')) {
      element.classList.add('isHovered');
      elementsModified++;
    }
  });
  
  // Return the number of elements modified
  return elementsModified;
}

// Function to repeatedly check and execute
function executeUntilFound() {
  const elementsModified = addHoveredClassToSectionOverlays();
  
  if (elementsModified > 0) {
    console.log(`Added "isHovered" class to ${elementsModified} new element(s)`);
  }
  
  // Continue executing every 200ms regardless of whether elements were found
  setTimeout(executeUntilFound, 200);
}

// -------------------

const htmlString = `<span style="width: 32px; height: 32px;  line-height: 32px; margin: 0 !important; border: 1px solid hsl(0, 0%, 62%);border-radius: 4px;" 
class="dijit dijitReset dijitInline epi-chromeless epi-mediumButton dijitToggleButton" role="presentation" widgetid="optext-designmode">
    <span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:_onClick" role="presentation">
        <span class="dijitReset dijitStretch dijitButtonContents" data-dojo-attach-point="titleNode,focusNode" role="button" aria-labelledby="optext-designmode_label" tabindex="0" id="optext-designmode" title="Design mode" aria-disabled="false" aria-pressed="false" style="user-select: none;">
            <span class="dijitReset dijitInline dijitIcon epi-iconGuides epi-icon--medium" data-dojo-attach-point="iconNode"></span>
            <span class="dijitReset dijitToggleButtonIconChar">●</span>
            <span class="dijitReset dijitInline dijitButtonText dijitDisplayNone" id="optext-designmode_label" data-dojo-attach-point="containerNode">Design mode</span>
        </span>
        </span>
    <input type="button" value="" class="dijitOffScreen" tabindex="-1" role="presentation" data-dojo-attach-point="valueNode">
</span>`;

// Function to create DOM element from HTML string
function createElementFromHTML(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstElementChild;
}

// Function to wait for the controls container to exist
function waitForControlsContainer() {
    return new Promise((resolve) => {
        const checkForContainer = () => {
            const containerElement = document.querySelector('[data-dojo-attach-point="trailingContainerNode"]');
            if (containerElement) {
                resolve(containerElement);
            } else {
                // Check again after a short delay
                setTimeout(checkForContainer, 100);
            }
        };
        checkForContainer();
    });
}

// Main execution function
async function addToggleButton() {
    try {
        // Wait for the controls container to exist
        const controlsContainer = await waitForControlsContainer();
        
        console.log('Controls container found:', controlsContainer);
        
        const designModeButton = createElementFromHTML(htmlString);
        
        if (controlsContainer.children.length >= 1) {
            // Insert before the current second child (index 1)
            controlsContainer.insertBefore(designModeButton, controlsContainer.children[1]);
        } else {
            // If there's no second child, just append
            controlsContainer.appendChild(designModeButton);
        }
        // You can also access and modify the element
        console.log('Element added:', designModeButton);
        designModeButton.addEventListener('click', () => {
        		overlayEnabled = !overlayEnabled;
        		
        		if (!overlayEnabled)
        		{
        			removeHoveredClassFromSectionOverlays();
        		}
            
            // Toggle CSS classes
            if (designModeButton.classList.contains('dijitToggleButtonChecked')) {
                designModeButton.classList.remove('dijitToggleButtonChecked', 'dijitChecked');
            } else {
                designModeButton.classList.add('dijitToggleButtonChecked', 'dijitChecked');
            }
            
            console.log('Toggle button clicked!');
        });
        
    } catch (error) {
        console.error('Error adding toggle button:', error);
    }
}

// Execute the function
addToggleButton();
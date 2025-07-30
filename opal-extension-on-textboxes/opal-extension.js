(function() {
            'use strict';

            const ICON_URL = 'https://images3.cmp.optimizely.com/assets/Opal_Icon.png/Zz1hYWM2YjI1MjVlMzQxMWYwYTU2NTMyMmFiZGM1NWUzMg==';
            
            let currentMenu = null;
            let observer = null;

            // Menu configuration
            const menuItems = [
                { label: 'Refine', action: 'refine' },
                { label: 'Fix spelling & grammar', action: 'fix-grammar' },
                { label: 'Elaborate', action: 'elaborate' },
                { label: 'Shorten', action: 'shorten' },
                { label: 'On brand', action: 'on-brand' },
                { 
                    label: 'Change Tone', 
                    action: 'change-tone',
                    submenu: [
                        { label: 'Formal', action: 'tone-formal' },
                        { label: 'Informal', action: 'tone-informal' }
                    ]
                }
            ];

            function createAIIcon(input) {
                const icon = document.createElement('div');
                icon.className = 'ai-assistant-icon';
                icon.innerHTML = `<img src="${ICON_URL}" alt="AI Assistant" />`;
                
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showMenu(icon, input);
                });

                return icon;
            }

            function createMenu() {
                const menu = document.createElement('div');
                menu.className = 'ai-menu';

                menuItems.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'ai-menu-item';
                    if (item.submenu) {
                        menuItem.classList.add('has-submenu');
                    }
                    menuItem.textContent = item.label;

                    if (item.submenu) {
                        const submenu = document.createElement('div');
                        submenu.className = 'ai-submenu';
                        
                        item.submenu.forEach(subItem => {
                            const subMenuItem = document.createElement('div');
                            subMenuItem.className = 'ai-menu-item';
                            subMenuItem.textContent = subItem.label;
                            subMenuItem.addEventListener('click', (e) => {
                                e.stopPropagation();
                                handleMenuAction(subItem.action, menu.associatedInput);
                                hideMenu();
                            });
                            submenu.appendChild(subMenuItem);
                        });
                        
                        menuItem.appendChild(submenu);
                    } else {
                        menuItem.addEventListener('click', (e) => {
                            e.stopPropagation();
                            handleMenuAction(item.action, menu.associatedInput);
                            hideMenu();
                        });
                    }

                    menu.appendChild(menuItem);
                });

                document.body.appendChild(menu);
                return menu;
            }

            function showMenu(icon, input) {
                hideMenu(); // Hide any existing menu

                const menu = createMenu();
                menu.associatedInput = input;
                
                const iconRect = icon.getBoundingClientRect();
                const menuHeight = 200; // Approximate menu height
                const windowHeight = window.innerHeight;
                
                // Position menu to the right of the icon, but check if it fits
                let left = iconRect.right + 5;
                let top = iconRect.top;
                
                // Adjust if menu would go off-screen horizontally
                if (left + 180 > window.innerWidth) {
                    left = iconRect.left - 185; // Show to the left instead
                }
                
                // Adjust if menu would go off-screen vertically
                if (top + menuHeight > windowHeight) {
                    top = windowHeight - menuHeight - 10;
                }
                
                menu.style.left = left + 'px';
                menu.style.top = top + 'px';
                menu.style.display = 'block';
                
                currentMenu = menu;
            }

            function hideMenu() {
                if (currentMenu) {
                    currentMenu.remove();
                    currentMenu = null;
                }
            }

            function handleMenuAction(action, input) {
                const inputValue = input.value || input.textContent || '';
                const actionLabels = {
                    'refine': 'Refine',
                    'fix-grammar': 'Fix spelling & grammar',
                    'elaborate': 'Elaborate',
                    'shorten': 'Shorten',
                    'on-brand': 'Make this content on brand',
                    'tone-formal': 'Change Tone - Formal',
                    'tone-informal': 'Change Tone - Informal'
                };
                
                const actionLabel = actionLabels[action] || action;
                const message = `${actionLabel}\n"${inputValue}"`;
                
                function populateTextarea() {
                    // Find the "Ask Opal" textarea
                    const opalTextarea = document.querySelector('textarea[placeholder*="Ask Opal"]');
                    
                    if (opalTextarea) {
                        opalTextarea.value = message;
                        opalTextarea.focus(); // Optional: focus the textarea
                        
                        // Trigger multiple events to ensure the application recognizes the change
                        const inputEvent = new Event('input', { bubbles: true });
                        const changeEvent = new Event('change', { bubbles: true });
                        const keyupEvent = new Event('keyup', { bubbles: true });
                        const selectionChangeEvent = new Event('selectionchange', { bubbles: true });
                        
                        opalTextarea.dispatchEvent(inputEvent);
                        opalTextarea.dispatchEvent(changeEvent);
                        opalTextarea.dispatchEvent(keyupEvent);
                        opalTextarea.dispatchEvent(selectionChangeEvent);
                        
                        // Also try triggering a synthetic keyboard event
                        const keyboardEvent = new KeyboardEvent('keydown', {
                            key: ' ',
                            code: 'Space',
                            bubbles: true
                        });
                        opalTextarea.dispatchEvent(keyboardEvent);
                        
                        // Find and click the Submit Prompt button
                        const submitButton = document.querySelector('button[aria-label="Submit Prompt"]');
                        if (submitButton) {
                            // Small delay to ensure textarea is fully updated
                            setTimeout(() => {
                                // Check if button is enabled before clicking
                                if (!submitButton.disabled && !submitButton.hasAttribute('disabled')) {
                                    submitButton.click();
                                } else {
                                    console.warn('Submit Prompt button is disabled');
                                }
                            }, 100);
                        } else {
                            console.warn('Submit Prompt button not found');
                        }
                        
                        return true; // Success
                    }
                    return false; // Textarea not found
                }
                
                // Try to populate textarea first
                if (!populateTextarea()) {
                    // If textarea not found, try to open the Opal chat window
                    const opalChatButton = document.querySelector('.text-action-item');
                    
                    if (opalChatButton) {
                        console.log('Opening Opal chat window...');
                        opalChatButton.click();
                        
                        // Wait for the chat window to open and try again
                        setTimeout(() => {
                            if (!populateTextarea()) {
                                console.warn('Ask Opal textarea still not found after opening chat window');
                                alert(message); // Fallback to alert
                            }
                        }, 1000); // Wait 1000ms for the UI to update
                    } else {
                        console.warn('Both Ask Opal textarea and chat window button not found. Using alert fallback.');
                        alert(message);
                    }
                }
            }

            function wrapInput(input) {
                // Skip if already processed
                if (input.closest('.ai-input-container')) {
                    return;
                }

                const wrapper = document.createElement('div');
                wrapper.className = 'ai-input-container';
                
                input.parentNode.insertBefore(wrapper, input);
                wrapper.appendChild(input);
                
                // Add class to input for styling
                input.classList.add('ai-enhanced-input');
                
                const icon = createAIIcon(input);
                wrapper.appendChild(icon);
            }

            function processInputs() {
                const contentWrappers = document.querySelectorAll('.content-edit__wrapper');
                
                contentWrappers.forEach(wrapper => {
                    const textInputs = wrapper.querySelectorAll('input[type="text"]');
                    textInputs.forEach(input => {
                        // Skip inputs whose name ends with "tags"
                        if (input.name && input.name.toLowerCase().endsWith('tags')) {
                            return;
                        }
                        
                        // Skip inputs with class "dijitArrowButtonInner"
                        if (input.classList.contains('dijitArrowButtonInner')) {
                            return;
                        }
                        
                        if (!input.closest('.ai-input-container')) {
                            wrapInput(input);
                        }
                    });
                });
            }

            function initializeObserver() {
                if (observer) {
                    observer.disconnect();
                }

                observer = new MutationObserver((mutations) => {
                    let shouldProcess = false;
                    
                    mutations.forEach(mutation => {
                        // Check for added nodes
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach(node => {
                                if (node.nodeType === Node.ELEMENT_NODE) {
                                    // Check if the added node is a text input or contains text inputs
                                    if (node.matches && node.matches('input[type="text"]')) {
                                        // Skip inputs whose name ends with "tags"
                                        if (!node.name || !node.name.toLowerCase().endsWith('tags')) {
                                            shouldProcess = true;
                                        }
                                    } else if (node.querySelectorAll) {
                                        const inputs = node.querySelectorAll('input[type="text"]');
                                        // Check if any of the new inputs should get icons (not ending with 'tags')
                                        if (inputs.length > 0) {
                                            let hasValidInputs = false;
                                            inputs.forEach(input => {
                                                if (!input.name || !input.name.toLowerCase().endsWith('tags')) {
                                                    hasValidInputs = true;
                                                }
                                            });
                                            if (hasValidInputs) {
                                                shouldProcess = true;
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                    
                    if (shouldProcess) {
                        setTimeout(processInputs, 10); // Small delay to ensure DOM is ready
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: false
                });
            }

            function initialize() {
                // Initial processing
                processInputs();
                
                // Set up DOM observation for dynamic content
                initializeObserver();
                
                // Hide menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (currentMenu && !currentMenu.contains(e.target)) {
                        hideMenu();
                    }
                });

                console.log('AI Content Editor Assistant initialized');
            }

            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initialize);
            } else {
                initialize();
            }

            // Global function for demo purposes
            window.addDynamicInput = function() {
                const wrapper = document.querySelector('.content-edit__wrapper');
                const newInput = document.createElement('input');
                newInput.type = 'text';
                newInput.className = 'demo-input';
                newInput.placeholder = 'Dynamically added input...';
                newInput.value = 'This input was added dynamically';
                wrapper.appendChild(newInput);
            };

            // Demo submit button click handler
            document.addEventListener('click', function(e) {
                if (e.target.matches('button[aria-label="Submit Prompt"]')) {
                    alert('Submit Prompt button clicked! In your real application, this would submit the prompt to Opal.');
                }
            });

            // Demo function to toggle Opal chat visibility
            window.toggleOpalChat = function(event) {
                event.preventDefault();
                const chatDiv = document.getElementById('opal-chat');
                const button = event.target;
                
                if (chatDiv.style.display === 'none') {
                    chatDiv.style.display = 'block';
                    button.textContent = 'Close Opal Chat';
                } else {
                    chatDiv.style.display = 'none';
                    button.textContent = 'Open Opal Chat';
                }
            };

        })();

var styles = `

  /* Styles for the AI assistant */
        .ai-assistant-icon {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            cursor: pointer;
            z-index: 1000;
            border-radius: 3px;
            padding: 2px;
            transition: background-color 0.2s ease;
        }

        .ai-assistant-icon:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }

        .ai-assistant-icon img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .ai-menu {
            position: absolute;
            background: white;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            min-width: 180px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            padding: 4px 0;
            display: none;
        }

        .ai-menu-item {
            padding: 8px 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;
            position: relative;
        }

        .ai-menu-item:hover {
            background-color: #f5f5f5;
        }

        .ai-menu-item.has-submenu::after {
            content: '▶';
            color: #666;
            font-size: 10px;
            margin-left: auto;
        }

        .ai-submenu {
            position: absolute;
            left: 100%;
            top: 0;
            background: white;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 120px;
            padding: 4px 0;
            display: none;
        }

        .ai-submenu .ai-menu-item {
            padding: 6px 12px;
        }

        .ai-menu-item:hover .ai-submenu {
            display: block;
        }

        /* Ensure input containers have relative positioning */
        .ai-input-container {
            position: relative !important;
            display: inline-block;
            width: 100%;
        }

        /* Adjust input padding to make room for icon */
        .ai-enhanced-input {
            padding-right: 32px !important;
        }

        /* Demo styles for the example */
        .demo-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .content-edit__wrapper {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            background: #f9f9f9;
        }

        .demo-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 10px 0;
            font-size: 14px;
        }

        .demo-title {
            color: #333;
            margin-bottom: 20px;
        }

        .demo-description {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.5;
        }

`

setTimeout(() => {
	var styleSheet = document.createElement("style")
	styleSheet.textContent = styles
	document.head.appendChild(styleSheet)	
}, 1000);

// Click-to-copy functionality for API keys
(function() {
    // Create and inject CSS for the popup
    const style = document.createElement('style');
    style.textContent = `
        .copy-popup {
            position: absolute;
            background: #2d3748;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        
        .copy-popup.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .copy-popup::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 20px;
            border: 5px solid transparent;
            border-top-color: #2d3748;
        }
        
        .copyable-value {
            cursor: pointer;
            transition: background-color 0.2s ease;
            padding: 4px 8px;
            border-radius: 4px;
            position: relative;
        }
        
        .copyable-value:hover {
            background-color: #f7fafc;
        }
        
        .copyable-input {
            cursor: pointer;
        }
        
        .copyable-input:hover {
            background-color: #f7fafc;
        }
    `;
    document.head.appendChild(style);

    // Function to show popup
    function showCopyPopup(element, text = 'Copied to clipboard') {
        const popup = document.createElement('div');
        popup.className = 'copy-popup';
        popup.textContent = text;
        document.body.appendChild(popup);
        
        // Position popup above the element (left-aligned)
        const rect = element.getBoundingClientRect();
        popup.style.left = `${rect.left}px`;
        popup.style.top = `${rect.top - 10}px`;
        popup.style.transform = 'translateY(-100%)';
        
        // Show popup
        requestAnimationFrame(() => {
            popup.classList.add('show');
        });
        
        // Remove popup after 2 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 200);
        }, 2000);
    }

    // Function to copy text to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    }

    // Function to make an element copyable
    function makeCopyable(element, getValue) {
        element.classList.add('copyable-value');
        element.addEventListener('click', async (e) => {
            e.preventDefault();
            const value = getValue(element);
            if (value) {
                const success = await copyToClipboard(value);
                if (success) {
                    showCopyPopup(element);
                } else {
                    showCopyPopup(element, 'Failed to copy');
                }
            }
        });
    }

    // Function to setup click-to-copy functionality
    function setupClickToCopy() {
        // Find all table cells that contain the values we want to copy
        const tables = document.querySelectorAll('.oui-table');
        
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                    const labelCell = cells[0];
                    const valueCell = cells[1];
                    const label = labelCell.textContent.trim();
                    
                    // Check if this row contains one of our target values
                    if (['Address', 'Single Key', 'App key', 'Secret'].includes(label)) {
                        // Handle regular text values
                        if (label !== 'Secret') {
                            makeCopyable(valueCell, (el) => el.textContent.trim());
                        } else {
                            // Handle the secret field which has an input element
                            const input = valueCell.querySelector('input');
                            if (input) {
                                input.classList.add('copyable-input');
                                input.addEventListener('click', async (e) => {
                                    e.preventDefault();
                                    const value = input.value;
                                    if (value) {
                                        const success = await copyToClipboard(value);
                                        if (success) {
                                            showCopyPopup(input);
                                        } else {
                                            showCopyPopup(input, 'Failed to copy');
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupClickToCopy);
    } else {
        setupClickToCopy();
    }

    // Also run setup after a short delay to handle dynamically loaded content
    setTimeout(setupClickToCopy, 1000);
    
    console.log('Click-to-copy functionality initialized for API keys');
})();
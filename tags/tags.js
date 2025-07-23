// Get the embedded HTML for the tag selector
    function getTagSelectorHTML() {
        return `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        ">
            <style>
                .tag-selector-modal * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                .tag-selector-modal {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    width: 100%;
                    max-width: 480px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                }

                .tag-selector-modal-header {
                    padding: 20px 24px 16px;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .tag-selector-modal-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                    flex: 1;
                }

                .tag-selector-settings-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 6px;
                    color: #6b7280;
                    transition: all 0.15s ease-in-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tag-selector-settings-btn:hover {
                    background: #f3f4f6;
                    color: #374151;
                }

                .tag-selector-cog-icon {
                    width: 20px;
                    height: 20px;
                }

                .tag-selector-modal-body {
                    padding: 20px 24px;
                    flex: 1;
                    overflow-y: auto;
                }

                .tag-selector-search-container {
                    margin-bottom: 16px;
                }

                .tag-selector-search-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 14px;
                    background: #ffffff;
                    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                }

                .tag-selector-search-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .tag-selector-tags-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 20px;
                    min-height: 120px;
                    max-height: 240px;
                    overflow-y: auto;
                    padding: 8px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    background: #f9fafb;
                }

                .tag-selector-tag {
                    display: inline-flex;
                    align-items: center;
                    padding: 6px 12px;
                    background: #f3f4f6;
                    border: 1px solid #d1d5db;
                    border-radius: 16px;
                    font-size: 14px;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.15s ease-in-out;
                    user-select: none;
                }

                .tag-selector-tag:hover {
                    background: #e5e7eb;
                    border-color: #9ca3af;
                }

                .tag-selector-tag.selected {
                    background: #dbeafe;
                    border-color: #3b82f6;
                    color: #1e40af;
                }

                .tag-selector-tag.selected:hover {
                    background: #bfdbfe;
                }

                .tag-selector-selected-tags {
                    margin-bottom: 20px;
                }

                .tag-selector-section-label {
                    font-size: 14px;
                    font-weight: 500;
                    color: #374151;
                    margin-bottom: 8px;
                    display: block;
                }

                .tag-selector-selected-tags-list {
                    min-height: 40px;
                    padding: 8px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    background: #ffffff;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    align-items: flex-start;
                }

                .tag-selector-selected-tag {
                    display: inline-flex;
                    align-items: center;
                    padding: 4px 8px;
                    background: #3b82f6;
                    color: white;
                    border-radius: 12px;
                    font-size: 12px;
                    gap: 4px;
                }

                .tag-selector-remove-tag {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    line-height: 1;
                }

                .tag-selector-remove-tag:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .tag-selector-modal-footer {
                    padding: 16px 24px 20px;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }

                .tag-selector-btn {
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.15s ease-in-out;
                    border: 1px solid transparent;
                }

                .tag-selector-btn-secondary {
                    background: #ffffff;
                    color: #374151;
                    border-color: #d1d5db;
                }

                .tag-selector-btn-secondary:hover {
                    background: #f9fafb;
                    border-color: #9ca3af;
                }

                .tag-selector-btn-primary {
                    background: #3b82f6;
                    color: white;
                }

                .tag-selector-btn-primary:hover {
                    background: #2563eb;
                }

                .tag-selector-btn-primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .tag-selector-empty-state {
                    text-align: center;
                    color: #6b7280;
                    font-size: 14px;
                    padding: 20px;
                }

                .tag-selector-settings-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: 2147483646;
                }

                .tag-selector-settings-modal.show {
                    display: flex;
                }

                .tag-selector-settings-content {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    width: 100%;
                    max-width: 500px;
                    max-height: 80vh;
                    display: flex;
                    flex-direction: column;
                }

                .tag-selector-settings-header {
                    padding: 20px 24px 16px;
                    border-bottom: 1px solid #e5e7eb;
                }

                .tag-selector-settings-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #111827;
                    margin: 0;
                }

                .tag-selector-settings-body {
                    padding: 20px 24px;
                    flex: 1;
                    overflow-y: auto;
                }

                .tag-selector-tag-editor {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .tag-selector-tag-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    background: #f9fafb;
                }

                .tag-selector-tag-input {
                    flex: 1;
                    padding: 4px 8px;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    font-size: 14px;
                }

                .tag-selector-tag-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .tag-selector-delete-tag-btn {
                    background: #ef4444;
                    color: white;
                    border: none;
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: background-color 0.15s ease-in-out;
                }

                .tag-selector-delete-tag-btn:hover {
                    background: #dc2626;
                }

                .tag-selector-add-new-tag-container {
                    display: flex;
                    gap: 8px;
                    margin-top: 16px;
                }

                .tag-selector-new-tag-name-input {
                    flex: 1;
                    padding: 8px 12px;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 14px;
                }

                .tag-selector-new-tag-name-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .tag-selector-add-new-tag-btn {
                    padding: 8px 16px;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.15s ease-in-out;
                }

                .tag-selector-add-new-tag-btn:hover {
                    background: #2563eb;
                }

                .tag-selector-add-new-tag-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .tag-selector-settings-footer {
                    padding: 16px 24px 20px;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }
            </style>
            
            <div class="tag-selector-modal">
                <div class="tag-selector-modal-header">
                    <h2 class="tag-selector-modal-title">Select Tags</h2>
                    <button class="tag-selector-settings-btn" id="tagSelectorSettingsBtn" title="Edit Available Tags">
                        <svg class="tag-selector-cog-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12 a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="tag-selector-modal-body">
                    <!-- Search -->
                    <div class="tag-selector-search-container">
                        <input 
                            type="text" 
                            class="tag-selector-search-input" 
                            placeholder="Search tags..."
                            id="tagSelectorSearchInput"
                        >
                    </div>

                    <!-- Available Tags -->
                    <div class="tag-selector-section-label">Available Tags</div>
                    <div class="tag-selector-tags-container" id="tagSelectorTagsContainer">
                        <!-- Tags will be populated here -->
                    </div>

                    <!-- Selected Tags -->
                    <div class="tag-selector-selected-tags">
                        <div class="tag-selector-section-label">Selected Tags</div>
                        <div class="tag-selector-selected-tags-list" id="tagSelectorSelectedTagsList">
                            <div class="tag-selector-empty-state" id="tagSelectorEmptyState">No tags selected</div>
                        </div>
                    </div>
                </div>

                <div class="tag-selector-modal-footer">
                    <button class="tag-selector-btn tag-selector-btn-secondary" id="tagSelectorCancelBtn">Cancel</button>
                    <button class="tag-selector-btn tag-selector-btn-primary" id="tagSelectorInsertBtn" disabled>Insert</button>
                </div>
            </div>

            <!-- Settings Modal -->
            <div class="tag-selector-settings-modal" id="tagSelectorSettingsModal">
                <div class="tag-selector-settings-content">
                    <div class="tag-selector-settings-header">
                        <h2 class="tag-selector-settings-title">Edit Available Tags</h2>
                    </div>
                    
                    <div class="tag-selector-settings-body">
                        <div class="tag-selector-tag-editor" id="tagSelectorTagEditor">
                            <!-- Tag editor items will be populated here -->
                        </div>
                        
                        <div class="tag-selector-add-new-tag-container">
                            <input 
                                type="text" 
                                class="tag-selector-new-tag-name-input" 
                                placeholder="Enter new tag name..."
                                id="tagSelectorNewTagNameInput"
                            >
                            <button class="tag-selector-add-new-tag-btn" id="tagSelectorAddNewTagBtn">Add Tag</button>
                        </div>
                    </div>

                    <div class="tag-selector-settings-footer">
                        <button class="tag-selector-btn tag-selector-btn-secondary" id="tagSelectorCancelSettingsBtn">Cancel</button>
                        <button class="tag-selector-btn tag-selector-btn-primary" id="tagSelectorSaveSettingsBtn">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            (function() {
                class TagSelector {
                    constructor() {
                        this.defaultTags = [
                            'JavaScript', 'React', 'Vue', 'Angular', 'Node.js',
                            'Python', 'Django', 'Flask', 'Java', 'Spring',
                            'HTML', 'CSS', 'Sass', 'TypeScript', 'PHP',
                            'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
                            'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD'
                        ];
                        this.availableTags = this.loadAvailableTags();
                        this.selectedTags = new Set();
                        this.filteredTags = [...this.availableTags];
                        this.tempAvailableTags = [...this.availableTags];
                        
                        this.initializeElements();
                        this.bindEvents();
                        this.renderTags();
                    }

                    loadAvailableTags() {
                        const saved = localStorage.getItem('tagSelector_availableTags');
                        return saved ? JSON.parse(saved) : [...this.defaultTags];
                    }

                    saveAvailableTags() {
                        localStorage.setItem('tagSelector_availableTags', JSON.stringify(this.availableTags));
                    }

                    initializeElements() {
                        this.searchInput = document.getElementById('tagSelectorSearchInput');
                        this.tagsContainer = document.getElementById('tagSelectorTagsContainer');
                        this.selectedTagsList = document.getElementById('tagSelectorSelectedTagsList');
                        this.emptyState = document.getElementById('tagSelectorEmptyState');
                        this.cancelBtn = document.getElementById('tagSelectorCancelBtn');
                        this.insertBtn = document.getElementById('tagSelectorInsertBtn');
                        this.settingsBtn = document.getElementById('tagSelectorSettingsBtn');
                        this.settingsModal = document.getElementById('tagSelectorSettingsModal');
                        this.tagEditor = document.getElementById('tagSelectorTagEditor');
                        this.newTagNameInput = document.getElementById('tagSelectorNewTagNameInput');
                        this.addNewTagBtn = document.getElementById('tagSelectorAddNewTagBtn');
                        this.cancelSettingsBtn = document.getElementById('tagSelectorCancelSettingsBtn');
                        this.saveSettingsBtn = document.getElementById('tagSelectorSaveSettingsBtn');
                    }

                    bindEvents() {
                        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
                        this.cancelBtn.addEventListener('click', () => this.handleCancel());
                        this.insertBtn.addEventListener('click', () => this.handleInsert());
                        this.settingsBtn.addEventListener('click', () => this.openSettings());
                        this.newTagNameInput.addEventListener('input', (e) => this.handleNewTagNameInput(e));
                        this.newTagNameInput.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') this.addNewTagToSettings();
                        });
                        this.addNewTagBtn.addEventListener('click', () => this.addNewTagToSettings());
                        this.cancelSettingsBtn.addEventListener('click', () => this.closeSettings());
                        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
                        
                        this.settingsModal.addEventListener('click', (e) => {
                            if (e.target === this.settingsModal) this.closeSettings();
                        });
                    }

                    handleSearch(e) {
                        const query = e.target.value.toLowerCase();
                        this.filteredTags = this.availableTags.filter(tag => 
                            tag.toLowerCase().includes(query)
                        );
                        this.renderTags();
                    }

                    openSettings() {
                        this.tempAvailableTags = [...this.availableTags];
                        this.renderTagEditor();
                        this.settingsModal.classList.add('show');
                    }

                    closeSettings() {
                        this.settingsModal.classList.remove('show');
                        this.newTagNameInput.value = '';
                        this.updateAddNewTagBtn();
                    }

                    renderTagEditor() {
                        this.tagEditor.innerHTML = '';
                        
                        this.tempAvailableTags.forEach((tag, index) => {
                            const tagItem = document.createElement('div');
                            tagItem.className = 'tag-selector-tag-item';
                            tagItem.innerHTML = 
                                '<input type="text" class="tag-selector-tag-input" value="' + tag + '" data-index="' + index + '">' +
                                '<button class="tag-selector-delete-tag-btn" data-index="' + index + '">Delete</button>';
                            
                            const input = tagItem.querySelector('.tag-selector-tag-input');
                            const deleteBtn = tagItem.querySelector('.tag-selector-delete-tag-btn');
                            
                            input.addEventListener('input', (e) => {
                                this.tempAvailableTags[index] = e.target.value.trim();
                            });
                            
                            deleteBtn.addEventListener('click', () => {
                                this.tempAvailableTags.splice(index, 1);
                                this.renderTagEditor();
                            });
                            
                            this.tagEditor.appendChild(tagItem);
                        });
                    }

                    handleNewTagNameInput(e) {
                        this.updateAddNewTagBtn();
                    }

                    updateAddNewTagBtn() {
                        const value = this.newTagNameInput.value.trim();
                        this.addNewTagBtn.disabled = !value || 
                            this.tempAvailableTags.some(tag => tag.toLowerCase() === value.toLowerCase());
                    }

                    addNewTagToSettings() {
                        const value = this.newTagNameInput.value.trim();
                        if (value && !this.tempAvailableTags.some(tag => tag.toLowerCase() === value.toLowerCase())) {
                            this.tempAvailableTags.push(value);
                            this.newTagNameInput.value = '';
                            this.updateAddNewTagBtn();
                            this.renderTagEditor();
                        }
                    }

                    saveSettings() {
                        this.tempAvailableTags = this.tempAvailableTags
                            .filter(tag => tag.trim())
                            .filter((tag, index, array) => 
                                array.findIndex(t => t.toLowerCase() === tag.toLowerCase()) === index
                            );

                        this.availableTags = [...this.tempAvailableTags];
                        this.saveAvailableTags();
                        
                        this.selectedTags.forEach(tag => {
                            if (!this.availableTags.includes(tag)) {
                                this.selectedTags.delete(tag);
                            }
                        });
                        
                        this.filteredTags = [...this.availableTags];
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                        this.closeSettings();
                    }

                    toggleTag(tag) {
                        if (this.selectedTags.has(tag)) {
                            this.selectedTags.delete(tag);
                        } else {
                            this.selectedTags.add(tag);
                        }
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                    }

                    removeSelectedTag(tag) {
                        this.selectedTags.delete(tag);
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                    }

                    renderTags() {
                        this.tagsContainer.innerHTML = '';
                        
                        if (this.filteredTags.length === 0) {
                            this.tagsContainer.innerHTML = '<div class="tag-selector-empty-state">No tags found</div>';
                            return;
                        }

                        this.filteredTags.forEach(tag => {
                            const tagElement = document.createElement('div');
                            tagElement.className = 'tag-selector-tag ' + (this.selectedTags.has(tag) ? 'selected' : '');
                            tagElement.textContent = tag;
                            tagElement.addEventListener('click', () => this.toggleTag(tag));
                            this.tagsContainer.appendChild(tagElement);
                        });
                    }

                    renderSelectedTags() {
                        if (this.selectedTags.size === 0) {
                            this.selectedTagsList.innerHTML = '<div class="tag-selector-empty-state">No tags selected</div>';
                            return;
                        }

                        this.selectedTagsList.innerHTML = '';
                        this.selectedTags.forEach(tag => {
                            const tagElement = document.createElement('div');
                            tagElement.className = 'tag-selector-selected-tag';
                            tagElement.innerHTML = 
                                tag + 
                                '<button class="tag-selector-remove-tag" onclick="window.tagSelectorInstance.removeSelectedTag(\'' + tag + '\')">×</button>';
                            this.selectedTagsList.appendChild(tagElement);
                        });
                    }

                    updateInsertButton() {
                        this.insertBtn.disabled = this.selectedTags.size === 0;
                    }

                    handleCancel() {
                        document.dispatchEvent(new CustomEvent('tagSelectorAction', {
                            detail: { action: 'cancel' }
                        }));
                    }

                    handleInsert() {
                        const tags = Array.from(this.selectedTags);
                        document.dispatchEvent(new CustomEvent('tagSelectorAction', {
                            detail: { action: 'insert', tags: tags }
                        }));
                    }

                    setSelectedTags(tags) {
                        this.selectedTags.clear();
                        tags.forEach(tag => {
                            if (this.availableTags.includes(tag)) {
                                this.selectedTags.add(tag);
                            }
                        });
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                    }
                }

                // Initialize the tag selector
                window.tagSelectorInstance = new TagSelector();

                // Handle escape key to close modal
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        if (window.tagSelectorInstance.settingsModal.classList.contains('show')) {
                            window.tagSelectorInstance.closeSettings();
                        } else {
                            window.tagSelectorInstance.handleCancel();
                        }
                    }
                });
            })();
        </script>a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="tag-selector-modal-body">
                    <!-- Search -->
                    <div class="tag-selector-search-container">
                        <input 
                            type="text" 
                            class="tag-selector-search-input" 
                            placeholder="Search tags..."
                            id="tagSelectorSearchInput"
                        >
                    </div>

                    <!-- Available Tags -->
                    <div class="tag-selector-section-label">Available Tags</div>
                    <div class="tag-selector-tags-container" id="tagSelectorTagsContainer">
                        <!-- Tags will be populated here -->
                    </div>

                    <!-- Selected Tags -->
                    <div class="tag-selector-selected-tags">
                        <div class="tag-selector-section-label">Selected Tags</div>
                        <div class="tag-selector-selected-tags-list" id="tagSelectorSelectedTagsList">
                            <div class="tag-selector-empty-state" id="tagSelectorEmptyState">No tags selected</div>
                        </div>
                    </div>
                </div>

                <div class="tag-selector-modal-footer">
                    <button class="tag-selector-btn tag-selector-btn-secondary" id="tagSelectorCancelBtn">Cancel</button>
                    <button class="tag-selector-btn tag-selector-btn-primary" id="tagSelectorInsertBtn" disabled>Insert</button>
                </div>
            </div>

            <!-- Settings Modal -->
            <div class="tag-selector-settings-modal" id="tagSelectorSettingsModal">
                <div class="tag-selector-settings-content">
                    <div class="tag-selector-settings-header">
                        <h2 class="tag-selector-settings-title">Edit Available Tags</h2>
                    </div>
                    
                    <div class="tag-selector-settings-body">
                        <div class="tag-selector-tag-editor" id="tagSelectorTagEditor">
                            <!-- Tag editor items will be populated here -->
                        </div>
                        
                        <div class="tag-selector-add-new-tag-container">
                            <input 
                                type="text" 
                                class="tag-selector-new-tag-name-input" 
                                placeholder="Enter new tag name..."
                                id="tagSelectorNewTagNameInput"
                            >
                            <button class="tag-selector-add-new-tag-btn" id="tagSelectorAddNewTagBtn">Add Tag</button>
                        </div>
                    </div>

                    <div class="tag-selector-settings-footer">
                        <button class="tag-selector-btn tag-selector-btn-secondary" id="tagSelectorCancelSettingsBtn">Cancel</button>
                        <button class="tag-selector-btn tag-selector-btn-primary" id="tagSelectorSaveSettingsBtn">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            (function() {
                class TagSelector {
                    constructor() {
                        this.defaultTags = [
                            'JavaScript', 'React', 'Vue', 'Angular', 'Node.js',
                            'Python', 'Django', 'Flask', 'Java', 'Spring',
                            'HTML', 'CSS', 'Sass', 'TypeScript', 'PHP',
                            'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
                            'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD'
                        ];
                        this.availableTags = this.loadAvailableTags();
                        this.selectedTags = new Set();
                        this.filteredTags = [...this.availableTags];
                        this.tempAvailableTags = [...this.availableTags];
                        
                        this.initializeElements();
                        this.bindEvents();
                        this.renderTags();
                    }

                    loadAvailableTags() {
                        const saved = localStorage.getItem('tagSelector_availableTags');
                        return saved ? JSON.parse(saved) : [...this.defaultTags];
                    }

                    saveAvailableTags() {
                        localStorage.setItem('tagSelector_availableTags', JSON.stringify(this.availableTags));
                    }

                    initializeElements() {
                        this.searchInput = document.getElementById('tagSelectorSearchInput');
                        this.tagsContainer = document.getElementById('tagSelectorTagsContainer');
                        this.selectedTagsList = document.getElementById('tagSelectorSelectedTagsList');
                        this.emptyState = document.getElementById('tagSelectorEmptyState');
                        this.cancelBtn = document.getElementById('tagSelectorCancelBtn');
                        this.insertBtn = document.getElementById('tagSelectorInsertBtn');
                        this.settingsBtn = document.getElementById('tagSelectorSettingsBtn');
                        this.settingsModal = document.getElementById('tagSelectorSettingsModal');
                        this.tagEditor = document.getElementById('tagSelectorTagEditor');
                        this.newTagNameInput = document.getElementById('tagSelectorNewTagNameInput');
                        this.addNewTagBtn = document.getElementById('tagSelectorAddNewTagBtn');
                        this.cancelSettingsBtn = document.getElementById('tagSelectorCancelSettingsBtn');
                        this.saveSettingsBtn = document.getElementById('tagSelectorSaveSettingsBtn');
                    }

                    bindEvents() {
                        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
                        this.cancelBtn.addEventListener('click', () => this.handleCancel());
                        this.insertBtn.addEventListener('click', () => this.handleInsert());
                        this.settingsBtn.addEventListener('click', () => this.openSettings());
                        this.newTagNameInput.addEventListener('input', (e) => this.handleNewTagNameInput(e));
                        this.newTagNameInput.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter') this.addNewTagToSettings();
                        });
                        this.addNewTagBtn.addEventListener('click', () => this.addNewTagToSettings());
                        this.cancelSettingsBtn.addEventListener('click', () => this.closeSettings());
                        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
                        
                        this.settingsModal.addEventListener('click', (e) => {
                            if (e.target === this.settingsModal) this.closeSettings();
                        });
                    }

                    handleSearch(e) {
                        const query = e.target.value.toLowerCase();
                        this.filteredTags = this.availableTags.filter(tag => 
                            tag.toLowerCase().includes(query)
                        );
                        this.renderTags();
                    }

                    openSettings() {
                        this.tempAvailableTags = [...this.availableTags];
                        this.renderTagEditor();
                        this.settingsModal.classList.add('show');
                    }

                    closeSettings() {
                        this.settingsModal.classList.remove('show');
                        this.newTagNameInput.value = '';
                        this.updateAddNewTagBtn();
                    }

                    renderTagEditor() {
                        this.tagEditor.innerHTML = '';
                        
                        this.tempAvailableTags.forEach((tag, index) => {
                            const tagItem = document.createElement('div');
                            tagItem.className = 'tag-selector-tag-item';
                            tagItem.innerHTML = 
                                '<input type="text" class="tag-selector-tag-input" value="' + tag + '" data-index="' + index + '">' +
                                '<button class="tag-selector-delete-tag-btn" data-index="' + index + '">Delete</button>';
                            
                            const input = tagItem.querySelector('.tag-selector-tag-input');
                            const deleteBtn = tagItem.querySelector('.tag-selector-delete-tag-btn');
                            
                            input.addEventListener('input', (e) => {
                                this.tempAvailableTags[index] = e.target.value.trim();
                            });
                            
                            deleteBtn.addEventListener('click', () => {
                                this.tempAvailableTags.splice(index, 1);
                                this.renderTagEditor();
                            });
                            
                            this.tagEditor.appendChild(tagItem);
                        });
                    }

                    handleNewTagNameInput(e) {
                        this.updateAddNewTagBtn();
                    }

                    updateAddNewTagBtn() {
                        const value = this.newTagNameInput.value.trim();
                        this.addNewTagBtn.disabled = !value || 
                            this.tempAvailableTags.some(tag => tag.toLowerCase() === value.toLowerCase());
                    }

                    addNewTagToSettings() {
                        const value = this.newTagNameInput.value.trim();
                        if (value && !this.tempAvailableTags.some(tag => tag.toLowerCase() === value.toLowerCase())) {
                            this.tempAvailableTags.push(value);
                            this.newTagNameInput.value = '';
                            this.updateAddNewTagBtn();
                            this.renderTagEditor();
                        }
                    }

                    saveSettings() {
                        this.tempAvailableTags = this.tempAvailableTags
                            .filter(tag => tag.trim())
                            .filter((tag, index, array) => 
                                array.findIndex(t => t.toLowerCase() === tag.toLowerCase()) === index
                            );

                        this.availableTags = [...this.tempAvailableTags];
                        this.saveAvailableTags();
                        
                        this.selectedTags.forEach(tag => {
                            if (!this.availableTags.includes(tag)) {
                                this.selectedTags.delete(tag);
                            }
                        });
                        
                        this.filteredTags = [...this.availableTags];
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                        this.closeSettings();
                    }

                    toggleTag(tag) {
                        if (this.selectedTags.has(tag)) {
                            this.selectedTags.delete(tag);
                        } else {
                            this.selectedTags.add(tag);
                        }
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                    }

                    removeSelectedTag(tag) {
                        this.selectedTags.delete(tag);
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                    }

                    renderTags() {
                        this.tagsContainer.innerHTML = '';
                        
                        if (this.filteredTags.length === 0) {
                            this.tagsContainer.innerHTML = '<div class="tag-selector-empty-state">No tags found</div>';
                            return;
                        }

                        this.filteredTags.forEach(tag => {
                            const tagElement = document.createElement('div');
                            tagElement.className = 'tag-selector-tag ' + (this.selectedTags.has(tag) ? 'selected' : '');
                            tagElement.textContent = tag;
                            tagElement.addEventListener('click', () => this.toggleTag(tag));
                            this.tagsContainer.appendChild(tagElement);
                        });
                    }

                    renderSelectedTags() {
                        if (this.selectedTags.size === 0) {
                            this.selectedTagsList.innerHTML = '<div class="tag-selector-empty-state">No tags selected</div>';
                            return;
                        }

                        this.selectedTagsList.innerHTML = '';
                        this.selectedTags.forEach(tag => {
                            const tagElement = document.createElement('div');
                            tagElement.className = 'tag-selector-selected-tag';
                            tagElement.innerHTML = 
                                tag + 
                                '<button class="tag-selector-remove-tag" onclick="window.tagSelectorInstance.removeSelectedTag(\'' + tag + '\')">×</button>';
                            this.selectedTagsList.appendChild(tagElement);
                        });
                    }

                    updateInsertButton() {
                        this.insertBtn.disabled = this.selectedTags.size === 0;
                    }

                    handleCancel() {
                        document.dispatchEvent(new CustomEvent('tagSelectorAction', {
                            detail: { action: 'cancel' }
                        }));
                    }

                    handleInsert() {
                        const tags = Array.from(this.selectedTags);
                        document.dispatchEvent(new CustomEvent('tagSelectorAction', {
                            detail: { action: 'insert', tags: tags }
                        }));
                    }

                    setSelectedTags(tags) {
                        this.selectedTags.clear();
                        tags.forEach(tag => {
                            if (this.availableTags.includes(tag)) {
                                this.selectedTags.add(tag);
                            }
                        });
                        this.renderTags();
                        this.renderSelectedTags();
                        this.updateInsertButton();
                    }
                }

                // Initialize the tag selector
                window.tagSelectorInstance = new TagSelector();

                // Handle escape key to close modal
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        if (window.tagSelectorInstance.settingsModal.classList.contains('show')) {
                            window.tagSelectorInstance.closeSettings();
                        } else {
                            window.tagSelectorInstance.handleCancel();
                        }
                    }
                });
            })();
        </script>
        `;
    }/**
 * Tag Selector Injector
 * Automatically detects textboxes with "SeoSettings.tags" in the name
 * and enables double-click functionality to open the tag selection popup
 */

class TagSelectorInjector {
    constructor() {
        this.defaultTags = ['Tag 1', 'Tag 2', 'Tag 3']; // Fallback tags
        this.availableTags = [...this.defaultTags];
        this.selectedTags = new Set();
        this.filteredTags = [...this.availableTags];
        this.isLoadingTags = false;
        
        this.options = {
            // Selector pattern for matching textboxes - make this more specific
            namePattern: 'seosettings.tags',
            // How often to check for new textboxes (ms)
            pollInterval: 1000,
            // CSS class to mark processed textboxes
            processedClass: 'tag-selector-enabled',
            // Popup window dimensions
            popupWidth: 500,
            popupHeight: 600,
            // Custom popup URL (if hosting separately)
            popupUrl: null,
            ...arguments[0]
        };

        this.observer = null;
        this.activePopup = null;
        this.currentTextbox = null;
        this.messageListener = null;

        // Load tags from GraphQL API
        this.loadTagsFromAPI();

        this.init();
    }

    async loadTagsFromAPI() {
        if (this.isLoadingTags) return;
        this.isLoadingTags = true;
        
        try {
            console.log('Loading tags from GraphQL API...');
            
            // Step 1: Get the singleKey
            const singleKey = await this.getSingleKey();
            if (!singleKey) {
                console.error('Failed to get singleKey, using default tags');
                return;
            }
            
            console.log('Got singleKey, fetching tags...');
            
            // Step 2: Use singleKey to query GraphQL API
            const tags = await this.fetchTagsFromGraphQL(singleKey);
            if (tags && tags.length > 0) {
                this.availableTags = tags;
                this.filteredTags = [...tags];
                console.log('Successfully loaded tags from API:', tags);
            } else {
                console.log('No tags returned from API, using default tags');
            }
            
        } catch (error) {
            console.error('Error loading tags from API:', error);
            console.log('Using default tags due to error');
        } finally {
            this.isLoadingTags = false;
        }
    }

    async getSingleKey() {
        try {
            // Use current site's domain instead of hardcoded domain
            const currentDomain = window.location.origin;
            const credentialsUrl = `${currentDomain}/ui/EPiServer.Cms.UI.Credentials/Credentials/GetGraphCredentials`;
            
            console.log('Fetching singleKey from:', credentialsUrl);
            
            const response = await fetch(credentialsUrl, {
                method: 'GET',
                credentials: 'include', // Include cookies for authentication
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Credentials response:', data);
            
            if (data && data.singleKey) {
                return data.singleKey;
            } else {
                console.error('No singleKey found in response:', data);
                return null;
            }
            
        } catch (error) {
            console.error('Error fetching singleKey:', error);
            return null;
        }
    }

    async fetchTagsFromGraphQL(singleKey) {
        try {
            const graphqlUrl = `https://cg.optimizely.com/content/v2?auth=${singleKey}`;
            
            const query = `
                query MyQuery {
                    Tag {
                        items {
                            TagTitle
                        }
                    }
                }
            `;
            
            const response = await fetch(graphqlUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: query
                })
            });
            
            if (!response.ok) {
                throw new Error(`GraphQL HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('GraphQL response:', result);
            
            if (result.errors) {
                console.error('GraphQL errors:', result.errors);
                return null;
            }
            
            if (result.data && result.data.Tag && result.data.Tag.items) {
                // Extract TagTitle from each item
                const tags = result.data.Tag.items
                    .map(item => item.TagTitle)
                    .filter(title => title && title.trim()) // Remove empty titles
                    .sort(); // Sort alphabetically
                
                return tags;
            } else {
                console.error('Unexpected GraphQL response structure:', result);
                return null;
            }
            
        } catch (error) {
            console.error('Error fetching tags from GraphQL:', error);
            return null;
        }
    }



    init() {
        // Start monitoring for textboxes
        this.startMonitoring();
        
        // Setup message listener for popup communication
        this.setupMessageListener();
        
        console.log('Tag Selector Injector initialized');
    }

    startMonitoring() {
        // Use MutationObserver for better performance than polling
        if (window.MutationObserver) {
            this.observer = new MutationObserver((mutations) => {
                let shouldCheck = false;
                
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        shouldCheck = true;
                    }
                });
                
                if (shouldCheck) {
                    this.checkForTextboxes();
                }
            });

            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } else {
            // Fallback to polling for older browsers
            setInterval(() => this.checkForTextboxes(), this.options.pollInterval);
        }

        // Initial check
        this.checkForTextboxes();
    }

    checkForTextboxes() {
        // Find all input and textarea elements that match our pattern
        // Use more specific selector to only match textboxes with "tags" in the name
        const selector = `input[name*="tags"], textarea[name*="tags"]`;
        const textboxes = document.querySelectorAll(selector);

        textboxes.forEach(textbox => {
            // Additional check: make sure the name contains "seosettings" and "tags"
            if (textbox.name && 
                textbox.name.toLowerCase().includes('seosettings') && 
                textbox.name.toLowerCase().includes('tags') &&
                !textbox.classList.contains(this.options.processedClass)) {
                this.enableTagSelector(textbox);
            }
        });
    }

    enableTagSelector(textbox) {
        // Mark as processed
        textbox.classList.add(this.options.processedClass);
        
        // Add visual indicator
        textbox.style.cursor = 'pointer';
        textbox.title = 'Click to select tags';
        textbox.placeholder = 'Click to select tags';
        
        // Hide the original textbox and create a visual container
        textbox.style.display = 'none';
        
        // Create a visual tag container
        const tagContainer = this.createTagContainer(textbox);
        textbox.parentElement.insertBefore(tagContainer, textbox.nextSibling);
        
        // Add double-click event listener with debugging
        const doubleClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Double-click detected on tag container for textbox:', textbox.name);
            this.openTagSelector(textbox);
        };
        
        // Add single-click event listener
        const singleClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Single-click detected on tag container for textbox:', textbox.name);
            this.openTagSelector(textbox);
        };
        
        tagContainer.addEventListener('dblclick', doubleClickHandler);
        //tagContainer.addEventListener('click', singleClickHandler);
        
        // Store references for cleanup
        textbox._tagSelectorHandlers = { doubleClickHandler, singleClickHandler };
        textbox._tagContainer = tagContainer;

        // Initial render of tags
        this.updateTagDisplay(textbox);
        
        console.log('Tag selector enabled for textbox:', textbox.name);
    }

    createTagContainer(textbox) {
        const container = document.createElement('div');
        container.className = 'tag-display-container';
        
        // Style the container to look like the original textbox
        const textboxStyles = window.getComputedStyle(textbox);
        Object.assign(container.style, {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            padding: '8px 12px',
            border: textboxStyles.border || '1px solid #d1d5db',
            borderRadius: textboxStyles.borderRadius || '6px',
            backgroundColor: textboxStyles.backgroundColor || '#ffffff',
            minHeight: textboxStyles.height || '40px',
            width: textboxStyles.width || '100%',
            boxSizing: 'border-box',
            alignItems: 'center',
            cursor: 'pointer',
            fontFamily: textboxStyles.fontFamily,
            fontSize: textboxStyles.fontSize
        });
        
        // Add hover effect
        container.addEventListener('mouseenter', () => {
            container.style.borderColor = '#9ca3af';
        });
        
        container.addEventListener('mouseleave', () => {
            container.style.borderColor = textboxStyles.borderColor || '#d1d5db';
        });
        
        return container;
    }

    updateTagDisplay(textbox) {
        const container = textbox._tagContainer;
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Parse tags from textbox value
        const tags = this.parseTagsFromText(textbox.value);
        
        if (tags.length === 0) {
            // Show placeholder when no tags
            const placeholder = document.createElement('span');
            placeholder.textContent = 'Click to select tags';
            placeholder.style.color = '#9ca3af';
            placeholder.style.fontStyle = 'italic';
            container.appendChild(placeholder);
        } else {
            // Create visual tag pills
            tags.forEach((tag, index) => {
                const tagPill = document.createElement('span');
                tagPill.textContent = tag;
                
                Object.assign(tagPill.style, {
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    marginRight: index < tags.length - 1 ? '4px' : '0',
                    userSelect: 'none'
                });
                
                container.appendChild(tagPill);
            });
        }
        
        // Add tag indicator icon
        this.addTagIndicatorToContainer(container);
    }

    addTagIndicatorToContainer(container) {
        const indicator = document.createElement('span');
        indicator.innerHTML = '🏷️';
        indicator.title = 'Click to edit tags';
        
        Object.assign(indicator.style, {
            marginLeft: 'auto',
            fontSize: '14px',
            opacity: '0.7',
            cursor: 'pointer'
        });
        
        container.appendChild(indicator);
    }

    addVisualIndicator(textbox) {
        // Create a small tag icon indicator
        const indicator = document.createElement('span');
        indicator.innerHTML = '🏷️';
        indicator.style.cssText = `
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            pointer-events: auto;
            z-index: 1000;
            cursor: pointer;
        `;
        
        // Add click event to the indicator
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openTagSelector(textbox);
        });
        
        // Make parent container relative if needed
        const parent = textbox.parentElement;
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        
        parent.appendChild(indicator);
    }

    openTagSelector(textbox) {
        console.log('openTagSelector called for:', textbox.name);
        console.log('Setting currentTextbox to:', textbox);
        
        if (this.activePopup) {
            console.log('Modal already open, returning');
            return; // Modal already open
        }

        // IMPORTANT: Set the current textbox reference FIRST
        this.currentTextbox = textbox;
        console.log('Current textbox set to:', this.currentTextbox.name);
        
        // Parse existing tags from textbox value
        const existingTags = this.parseTagsFromText(textbox.value);
        console.log('Existing tags parsed:', existingTags);
        
        // If tags are still loading, show loading state
        if (this.isLoadingTags) {
            console.log('Tags still loading from API...');
        }
        
        // Create and show modal
        try {
            this.createModal(existingTags);
        } catch (error) {
            console.error('Error creating modal:', error);
            // Fallback: try alternative modal creation
            this.createModalAlternative(existingTags);
        }
    }

    createModalAlternative(existingTags) {
        console.log('Using alternative modal creation method');
        
        // Create modal with document.createElement approach
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        modalContent.innerHTML = `
            <h2>Tag Selector</h2>
            <p>Modal is working! Textbox: ${this.currentTextbox.name}</p>
            <p>Existing tags: ${existingTags.join(', ')}</p>
            <button onclick="window.tagSelectorInjector.closeModal()">Close</button>
        `;
        
        overlay.appendChild(modalContent);
        document.body.appendChild(overlay);
        this.activePopup = overlay;
        
        console.log('Alternative modal created');
    }

    parseTagsFromText(text) {
        if (!text || !text.trim()) return [];
        
        // Split by common separators and clean up
        return text.split(/[,;|]/)
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
    }

    createModal(existingTags) {
        // Remove any existing modal first
        this.closeModal();
        
        // Create modal overlay with simple, bulletproof approach
        this.activePopup = document.createElement('div');
        this.activePopup.id = 'tagSelectorModalOverlay';
        
        // Set styles directly on the element
        Object.assign(this.activePopup.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '2147483647',
            fontFamily: 'Arial, sans-serif'
        });
        
        // Create inner modal content
        const modalContent = document.createElement('div');
        Object.assign(modalContent.style, {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        });
        
        // Create header
        const header = document.createElement('div');
        Object.assign(header.style, {
            padding: '20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        });
        
        const title = document.createElement('h2');
        title.textContent = 'Select Tags';
        Object.assign(title.style, {
            margin: '0',
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827'
        });
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.onclick = () => {
            console.log('Close button clicked');
            this.closeModal();
        };
        Object.assign(closeBtn.style, {
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        });
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // Create body
        const body = document.createElement('div');
        Object.assign(body.style, {
            padding: '20px',
            flex: '1',
            overflowY: 'auto'
        });
        
        // Search input
        const searchContainer = document.createElement('div');
        searchContainer.style.marginBottom = '16px';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search tags...';
        searchInput.id = 'tagSelectorSearchInput';
        Object.assign(searchInput.style, {
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box'
        });
        
        searchContainer.appendChild(searchInput);
        
        // Available tags section
        const availableLabel = document.createElement('div');
        availableLabel.textContent = 'Available Tags';
        Object.assign(availableLabel.style, {
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
        });
        
        const tagsContainer = document.createElement('div');
        tagsContainer.id = 'tagSelectorTagsContainer';
        Object.assign(tagsContainer.style, {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px',
            minHeight: '120px',
            maxHeight: '200px',
            overflowY: 'auto',
            padding: '8px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: '#f9fafb',
            boxSizing: 'border-box'
        });
        
        // Selected tags section
        const selectedLabel = document.createElement('div');
        selectedLabel.textContent = 'Selected Tags';
        Object.assign(selectedLabel.style, {
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
        });
        
        const selectedTagsList = document.createElement('div');
        selectedTagsList.id = 'tagSelectorSelectedTagsList';
        Object.assign(selectedTagsList.style, {
            minHeight: '40px',
            padding: '8px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            alignItems: 'flex-start',
            boxSizing: 'border-box'
        });
        
        // Add content to body
        body.appendChild(searchContainer);
        body.appendChild(availableLabel);
        body.appendChild(tagsContainer);
        body.appendChild(selectedLabel);
        body.appendChild(selectedTagsList);
        
        // Create footer
        const footer = document.createElement('div');
        Object.assign(footer.style, {
            padding: '16px 20px',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px'
        });
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.onclick = () => {
            console.log('Cancel button clicked');
            this.closeModal();
        };
        Object.assign(cancelBtn.style, {
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            color: '#374151',
            border: '1px solid #d1d5db'
        });
        
        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear All';
        clearBtn.onclick = () => {
            console.log('Clear All button clicked');
            this.handleClearAll();
        };
        Object.assign(clearBtn.style, {
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            color: '#374151',
            border: '1px solid #d1d5db'
        });
        
        const insertBtn = document.createElement('button');
        insertBtn.textContent = 'Insert';
        insertBtn.id = 'tagSelectorInsertBtn';
        insertBtn.onclick = () => {
            console.log('Insert button clicked');
            this.handleInsert();
        };
        insertBtn.disabled = true;
        Object.assign(insertBtn.style, {
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: '1px solid transparent',
            opacity: '0.5'
        });
        
        footer.appendChild(cancelBtn);
        footer.appendChild(clearBtn);
        footer.appendChild(insertBtn);
        
        // Assemble modal
        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modalContent.appendChild(footer);
        this.activePopup.appendChild(modalContent);
        
        // Add to DOM
        document.body.appendChild(this.activePopup);
        
        console.log('Simple modal created and added to DOM');
        console.log('Modal content element:', modalContent);
        
        // Initialize tag selector with simple approach
        setTimeout(() => {
            this.initializeSimpleTagSelector(existingTags);
        }, 50);
    }

    handleInsert() {
        console.log('handleInsert called');
        console.log('Current textbox reference:', this.currentTextbox);
        console.log('Current textbox name:', this.currentTextbox ? this.currentTextbox.name : 'UNDEFINED');
        
        const tags = Array.from(this.selectedTags);
        console.log('Selected tags for insert:', tags);
        console.log('Tags length:', tags.length);
        console.log('Has currentTextbox:', !!this.currentTextbox);
        
        if (this.currentTextbox && tags.length > 0) {
            // Format tags as comma-separated string
            const tagString = tags.join(', ');
            console.log('Formatted tag string:', tagString);
            
            // For React applications, we need to trigger events that React can detect
            console.log('Before update - textbox value:', this.currentTextbox.value);
            
            // Method 1: Set the value and trigger React-specific events
            this.currentTextbox.value = tagString;
            
            // Method 2: Trigger React's synthetic events
            this.triggerReactChangeEvents(this.currentTextbox, tagString);
            
            // Method 3: Update the visual tag display
            this.updateTagDisplay(this.currentTextbox);
            
            console.log('After update - textbox value:', this.currentTextbox.value);
            console.log('Tags inserted into textbox:', tagString);
            console.log('Textbox updated:', this.currentTextbox.name);
        } else {
            console.log('PROBLEM: No textbox or no tags selected');
            console.log('  - currentTextbox exists:', !!this.currentTextbox);
            console.log('  - tags length:', tags.length);
            if (this.currentTextbox) {
                console.log('  - textbox name:', this.currentTextbox.name);
                console.log('  - textbox element:', this.currentTextbox);
            }
        }
        
        this.closeModal();
    }

    triggerReactChangeEvents(element, newValue) {
        try {
            console.log('Attempting React change detection for:', element.name);
            
            // Method 1: Direct value manipulation with descriptor override
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
            
            if (element.tagName === 'INPUT') {
                nativeInputValueSetter.call(element, newValue);
            } else if (element.tagName === 'TEXTAREA') {
                nativeTextAreaValueSetter.call(element, newValue);
            }
            
            // Method 2: Create realistic input event that React detects
            const inputEvent = new Event('input', { 
                bubbles: true, 
                cancelable: true,
                composed: true 
            });
            
            // Set the event properties that React expects
            Object.defineProperty(inputEvent, 'target', {
                value: element,
                enumerable: true
            });
            Object.defineProperty(inputEvent, 'currentTarget', {
                value: element,
                enumerable: true
            });
            
            element.dispatchEvent(inputEvent);
            console.log('Input event dispatched');
            
            // Method 3: Simulate keyboard events (React often listens to these)
            const keydownEvent = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                key: 'Enter',
                code: 'Enter'
            });
            element.dispatchEvent(keydownEvent);
            
            const keyupEvent = new KeyboardEvent('keyup', {
                bubbles: true,
                cancelable: true,
                key: 'Enter',
                code: 'Enter'
            });
            element.dispatchEvent(keyupEvent);
            
            // Method 4: Change event
            const changeEvent = new Event('change', { 
                bubbles: true, 
                cancelable: true 
            });
            Object.defineProperty(changeEvent, 'target', {
                value: element,
                enumerable: true
            });
            element.dispatchEvent(changeEvent);
            console.log('Change event dispatched');
            
            // Method 5: Focus manipulation
            element.focus();
            
            // Method 6: Try React's internal event system
            const reactEventKey = Object.keys(element).find(key => 
                key.startsWith('__reactEventHandlers') || 
                key.startsWith('__reactProps')
            );
            
            if (reactEventKey) {
                console.log('Found React event handlers key:', reactEventKey);
                const reactData = element[reactEventKey];
                if (reactData && reactData.onChange) {
                    console.log('Calling React onChange directly');
                    reactData.onChange({
                        target: { value: newValue, name: element.name },
                        currentTarget: { value: newValue, name: element.name },
                        preventDefault: () => {},
                        stopPropagation: () => {}
                    });
                }
            }
            
            // Method 7: Try mutation observer to trigger React's detection
            setTimeout(() => {
                element.blur();
                element.focus();
            }, 10);
            
            console.log('All React change events attempted');
            
        } catch (error) {
            console.error('Error triggering React events:', error);
            // Ultimate fallback
            this.triggerBasicChangeEvents(element);
        }
    }

    triggerBasicChangeEvents(element) {
        console.log('Using basic change events fallback');
        const events = ['input', 'change', 'blur', 'focus'];
        
        events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true });
            element.dispatchEvent(event);
        });
    }

    triggerReactOnChange(element, newValue) {
        try {
            // Look for React's internal instance
            const reactInstance = element._reactInternalFiber || 
                                element._reactInternalInstance || 
                                element.__reactInternalInstance ||
                                Object.keys(element).find(key => key.startsWith('__reactInternalInstance'));
            
            if (reactInstance) {
                console.log('Found React instance, triggering onChange');
                
                // Try to find and call React's onChange handler
                const props = reactInstance.memoizedProps || reactInstance._currentElement.props;
                if (props && props.onChange) {
                    const syntheticEvent = {
                        target: { value: newValue },
                        currentTarget: { value: newValue },
                        preventDefault: () => {},
                        stopPropagation: () => {}
                    };
                    props.onChange(syntheticEvent);
                    console.log('React onChange called directly');
                }
            }
        } catch (error) {
            console.log('Could not trigger React onChange directly:', error.message);
        }
    }

    triggerChangeEvents(element) {
        // Trigger various change events for compatibility
        const events = ['input', 'change', 'blur'];
        
        events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true });
            element.dispatchEvent(event);
        });
        
        console.log('Change events triggered for:', element.name);
    }

    handleClearAll() {
        console.log('handleClearAll called');
        
        if (this.currentTextbox) {
            // Clear the textbox value
            this.currentTextbox.value = '';
            console.log('Textbox value cleared');
            
            // Trigger React events for the cleared value
            this.triggerReactChangeEvents(this.currentTextbox, '');
            
            // Update the visual tag display
            this.updateTagDisplay(this.currentTextbox);
            
            console.log('Tags cleared from textbox:', this.currentTextbox.name);
        } else {
            console.log('No textbox reference found');
        }
        
        this.closeModal();
    }

    initializeSimpleTagSelector(existingTags) {
        // Initialize with default tags
        this.selectedTags = new Set();
        this.filteredTags = [...this.availableTags];
        
        // Set existing tags
        if (existingTags && existingTags.length > 0) {
            existingTags.forEach(tag => {
                if (this.availableTags.includes(tag)) {
                    this.selectedTags.add(tag);
                }
            });
        }
        
        // Setup search
        const searchInput = document.getElementById('tagSelectorSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filteredTags = this.availableTags.filter(tag => 
                    tag.toLowerCase().includes(query)
                );
                this.renderSimpleTags();
            });
        }
        
        // Render initial state
        this.renderSimpleTags();
        this.renderSimpleSelectedTags();
        this.updateSimpleInsertButton();
        
        console.log('Simple tag selector initialized');
    }

    renderSimpleTags() {
        const container = document.getElementById('tagSelectorTagsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Show loading state if tags are being fetched
        if (this.isLoadingTags) {
            const loadingMsg = document.createElement('div');
            loadingMsg.textContent = 'Loading tags from API...';
            loadingMsg.style.color = '#6b7280';
            loadingMsg.style.padding = '20px';
            loadingMsg.style.textAlign = 'center';
            loadingMsg.style.width = '100%';
            loadingMsg.style.fontStyle = 'italic';
            container.appendChild(loadingMsg);
            return;
        }
        
        if (this.filteredTags.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = 'No tags found';
            emptyMsg.style.color = '#6b7280';
            emptyMsg.style.padding = '20px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.width = '100%';
            container.appendChild(emptyMsg);
            return;
        }
        
        // Store reference to this for use in event handlers
        const self = this;
        
        this.filteredTags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.textContent = tag;
            
            const isSelected = this.selectedTags.has(tag);
            Object.assign(tagElement.style, {
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                backgroundColor: isSelected ? '#dbeafe' : '#f3f4f6',
                border: isSelected ? '1px solid #3b82f6' : '1px solid #d1d5db',
                borderRadius: '16px',
                fontSize: '14px',
                color: isSelected ? '#1e40af' : '#374151',
                cursor: 'pointer',
                userSelect: 'none',
                margin: '2px'
            });
            
            tagElement.addEventListener('click', function() {
                console.log('Tag clicked:', tag);
                if (self.selectedTags.has(tag)) {
                    self.selectedTags.delete(tag);
                    console.log('Tag removed:', tag);
                } else {
                    self.selectedTags.add(tag);
                    console.log('Tag added:', tag);
                }
                console.log('Selected tags now:', Array.from(self.selectedTags));
                self.renderSimpleTags();
                self.renderSimpleSelectedTags();
                self.updateSimpleInsertButton();
            });
            
            container.appendChild(tagElement);
        });
    }

    renderSimpleSelectedTags() {
        const container = document.getElementById('tagSelectorSelectedTagsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.selectedTags.size === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = 'No tags selected';
            emptyMsg.style.color = '#6b7280';
            emptyMsg.style.padding = '20px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.width = '100%';
            container.appendChild(emptyMsg);
            return;
        }
        
        // Store reference to this for use in event handlers
        const self = this;
        
        this.selectedTags.forEach(tag => {
            const tagElement = document.createElement('div');
            Object.assign(tagElement.style, {
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                gap: '4px',
                margin: '2px'
            });
            
            const tagText = document.createElement('span');
            tagText.textContent = tag;
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            Object.assign(removeBtn.style, {
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
            });
            
            removeBtn.addEventListener('click', function() {
                console.log('Remove button clicked for tag:', tag);
                self.selectedTags.delete(tag);
                self.renderSimpleTags();
                self.renderSimpleSelectedTags();
                self.updateSimpleInsertButton();
            });
            
            tagElement.appendChild(tagText);
            tagElement.appendChild(removeBtn);
            container.appendChild(tagElement);
        });
    }

    updateSimpleInsertButton() {
        const insertBtn = document.getElementById('tagSelectorInsertBtn');
        if (insertBtn) {
            const hasSelectedTags = this.selectedTags.size > 0;
            insertBtn.disabled = !hasSelectedTags;
            insertBtn.style.opacity = hasSelectedTags ? '1' : '0.5';
            insertBtn.style.cursor = hasSelectedTags ? 'pointer' : 'not-allowed';
            console.log('Insert button updated. Selected tags count:', this.selectedTags.size, 'Enabled:', hasSelectedTags);
        } else {
            console.log('Insert button not found in DOM');
        }
    }

    renderSimpleTags() {
        const container = document.getElementById('tagSelectorTagsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.filteredTags.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = 'No tags found';
            emptyMsg.style.color = '#6b7280';
            emptyMsg.style.padding = '20px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.width = '100%';
            container.appendChild(emptyMsg);
            return;
        }
        
        // Store reference to this for use in event handlers
        const self = this;
        
        this.filteredTags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.textContent = tag;
            
            const isSelected = this.selectedTags.has(tag);
            Object.assign(tagElement.style, {
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                backgroundColor: isSelected ? '#dbeafe' : '#f3f4f6',
                border: isSelected ? '1px solid #3b82f6' : '1px solid #d1d5db',
                borderRadius: '16px',
                fontSize: '14px',
                color: isSelected ? '#1e40af' : '#374151',
                cursor: 'pointer',
                userSelect: 'none',
                margin: '2px'
            });
            
            tagElement.addEventListener('click', function() {
                console.log('Tag clicked:', tag);
                if (self.selectedTags.has(tag)) {
                    self.selectedTags.delete(tag);
                    console.log('Tag removed:', tag);
                } else {
                    self.selectedTags.add(tag);
                    console.log('Tag added:', tag);
                }
                console.log('Selected tags now:', Array.from(self.selectedTags));
                self.renderSimpleTags();
                self.renderSimpleSelectedTags();
                self.updateSimpleInsertButton();
            });
            
            container.appendChild(tagElement);
        });
    }

    renderSimpleSelectedTags() {
        const container = document.getElementById('tagSelectorSelectedTagsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.selectedTags.size === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = 'No tags selected';
            emptyMsg.style.color = '#6b7280';
            emptyMsg.style.padding = '20px';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.width = '100%';
            container.appendChild(emptyMsg);
            return;
        }
        
        // Store reference to this for use in event handlers
        const self = this;
        
        this.selectedTags.forEach(tag => {
            const tagElement = document.createElement('div');
            Object.assign(tagElement.style, {
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '12px',
                fontSize: '12px',
                gap: '4px',
                margin: '2px'
            });
            
            const tagText = document.createElement('span');
            tagText.textContent = tag;
            
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            Object.assign(removeBtn.style, {
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
            });
            
            removeBtn.addEventListener('click', function() {
                console.log('Remove button clicked for tag:', tag);
                self.selectedTags.delete(tag);
                self.renderSimpleTags();
                self.renderSimpleSelectedTags();
                self.updateSimpleInsertButton();
            });
            
            tagElement.appendChild(tagText);
            tagElement.appendChild(removeBtn);
            container.appendChild(tagElement);
        });
    }



    setupMessageListener() {
        // For modal, we'll use custom events instead of postMessage
        document.addEventListener('tagSelectorAction', (event) => {
            this.handleModalAction(event.detail);
        });
    }

    handleModalAction(data) {
        if (!this.currentTextbox) return;
        
        switch (data.action) {
            case 'insert':
                this.insertTags(data.tags);
                this.closeModal();
                break;
            case 'cancel':
                this.closeModal();
                break;
        }
    }

    insertTags(tags) {
        if (!this.currentTextbox || !tags) return;
        
        // Format tags as comma-separated string
        const tagString = tags.join(', ');
        
        // Update textbox value
        this.currentTextbox.value = tagString;
        
        // Trigger change events for form validation/frameworks
        this.triggerChangeEvents(this.currentTextbox);
        
        // Focus back to textbox
        this.currentTextbox.focus();
        
        console.log('Tags inserted:', tagString);
    }

    triggerChangeEvents(element) {
        // Trigger various change events for compatibility
        const events = ['input', 'change', 'blur'];
        
        events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true });
            element.dispatchEvent(event);
        });
    }

    closeModal() {
        if (this.activePopup) {
            try {
                if (this.activePopup.parentNode) {
                    this.activePopup.parentNode.removeChild(this.activePopup);
                }
            } catch (error) {
                console.error('Error removing modal:', error);
            }
            this.activePopup = null;
        }
        
        // DON'T clear currentTextbox here - keep it for potential reuse
        console.log('Modal closed - keeping textbox reference:', this.currentTextbox ? this.currentTextbox.name : 'none');
    }

    // Method to programmatically open tag selector for a specific textbox
    openForTextbox(textbox) {
        if (textbox && textbox.name && textbox.name.toLowerCase().includes(this.options.namePattern)) {
            this.openTagSelector(textbox);
        }
    }

    // Method to destroy the injector
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        document.removeEventListener('tagSelectorAction', this.handleModalAction);
        
        this.closeModal();
        
        // Remove all processed markers and event listeners
        const processedTextboxes = document.querySelectorAll(`.${this.options.processedClass}`);
        processedTextboxes.forEach(textbox => {
            textbox.classList.remove(this.options.processedClass);
            textbox.style.cursor = '';
            textbox.title = '';
        });
        
        console.log('Tag Selector Injector destroyed');
    }

    // Get the embedded HTML for the tag selector (placeholder)
    getTagSelectorHTML() {
        // This would contain the full HTML from your tag selector popup
        // For brevity, returning a placeholder - you would include the full HTML here
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Tag Selection</title>
                <style>/* Include all your CSS here */</style>
            </head>
            <body>
                <!-- Include all your HTML here -->
                <script>
                    // Include all your JavaScript here
                    // Add method to set selected tags from parent
                    if (window.tagSelector) {
                        window.tagSelector.setSelectedTags = function(tags) {
                            tags.forEach(tag => {
                                if (this.availableTags.includes(tag)) {
                                    this.selectedTags.add(tag);
                                }
                            });
                            this.renderTags();
                            this.renderSelectedTags();
                            this.updateInsertButton();
                        };
                    }
                </script>
            </body>
            </html>
        `;
    }
}

// Usage Examples and API

/**
 * Basic Usage:
 * 
 * // Initialize with default settings
 * const tagInjector = new TagSelectorInjector();
 * 
 * // Initialize with custom options
 * const tagInjector = new TagSelectorInjector({
 *     namePattern: 'SeoSettings.tags',
 *     popupWidth: 600,
 *     popupHeight: 700
 * });
 * 
 * // Programmatically open for specific textbox
 * const textbox = document.querySelector('input[name="SeoSettings.tags"]');
 * tagInjector.openForTextbox(textbox);
 * 
 * // Clean up when done
 * tagInjector.destroy();
 */

// Auto-initialize if this script is loaded directly
if (typeof window !== 'undefined' && !window.tagSelectorInjector) {
    window.tagSelectorInjector = new TagSelectorInjector();
}
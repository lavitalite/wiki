<template>
    <div id="search-modal__backdrop" class="search-modal__backdrop show" aria-modal="true" role="dialog">
        <div id="search-modal" class="search-modal" role="dialog" aria-label="Search modal">
            <div class="search-modal__header">
                <div class="search-modal__form">
                    <div class="search-modal__input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input type="search" id="search-modal__input" class="search-modal__input" placeholder="search docs"
                        aria-label="search docs">
                </div>
                <button class="search-modal__close">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" viewBox="0 0 24 24">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
        </svg>
                </button>
            </div>
            <div class="search-modal_results" id="search-modal_results" role="listbox" aria-label="Search results">
                <a class="search-modal__result" href="/manual/zh/function.json-decode.php" role="option" aria-labelledby="search-modal result-name-0" aria-describedby="search-modal result-description-0" aria-selected="false">
                    <div class="search-modal__result-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z"></path></svg>
                    </div>
                    <div class="search-modal__result-content">
                        <div class="search-modal__result-name">json-decode</div>
                        <div class="search-modal__result-description">json description</div>
                    </div>
                </a>
            </div>
            <div class="search-modal__helper-text"></div>
        </div>
    </div>
</template>


<style lang="css" scoped>
:root {
    --dark-grey-color: #333;
}

.input[type="search"] {
    -webkit-appearance: textfield;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}

a {
    text-decoration: none;
}
a:link,
a:visited {
    color: #ccc;
}

button,
input,
select,
textarea {
    font-family: inherit;
    margin: 0;
}

.search-modal .search-modal * {
    box-sizing: border-box;
}

.search_modal__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.1s ease-out;
}

.search_modal__backdrop.show {
    visibility: true;
    opacity: 1;
}

.searhc-modal {
    max-width: 560px;
    margin: 1rem auto;
    border-radius: 16px;
    height: calc(100% - 1rem * 2);
}

.search-modal {
    display: flex;
    flex-direction: column;
    background-color: var(--dark-grey-color);
}


.search-modal__header {
    padding: 18px 20px;
    display: flex;
    align-items: center;
}


.search-modal__form {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding-left: 12px;
    border-radius: 8px;
    background-color: hsl(0, 0%, 25%);
}

.search-modal__input {
    height: 52px;
    font-size: 18px;
    padding-left: 12px;
    flex-grow: 1;
    color: white;
    background-color: transparent;
    border: none;
}

.search-modal__input-icon {
    width: 24px;
}

.search-modal__input-icon svg {
    display: block;
    color: hsl(0, 0%, 54%);
}

.search-modal__close {
    border:0;
    padding:8px;
    margin-left:8px;
    color:#e8e8e8;
    cursor:pointer;
    background-color:transparent;
    opacity: 0.65;
    transition: opacity 0.15s ease-out;
}

.search-modal__close svg {
    display: block;
    fill:currentColor;
    width: 24px;
}


.search-modal__results {
    height: 100%;
    padding: 0 16px;
    overflow-y: scroll;
    scrollbar-color: hsl(0, 0%, 67%);
    scrollbar-width: thin;
}

.search-modal__result {
    border-radius: 0.5rem;
    border: none;
    padding: 10px;
    padding-left: 14px;
    line-height: 1.2; /**多行文本的间距 */
    display: flex;
    align-items: center;
}

.search-modal__result-icon {
    margin-right: 12px;
}

.search-modal__result-icon svg {
    display: block;
    width: 24px;
    fill: hsla(0, 0%, 100%, 0.3)
}

.search-modal-result-content{
    flex-grow:1'
}
.search-modal__result-name {
    color: #e6e6e6;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 6px;
}

.search-modal__result-description {
    overflow: hidden;
  font-size: 14px;
  color: #ccc;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 992px) {
    .search-modal__results {
        padding: 0 20px;
    }
}
</style>
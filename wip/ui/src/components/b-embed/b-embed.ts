export class BEmbed extends HTMLElement {
  static get observedAttrs(){
    return ['aspect','type', 'tag']
  }

  constructor(){
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback(){
    this.render()
  }

  attributeChangedCallback() {
    this.render();
  }

  get aspect(){
    return this.getAttribute('aspect') || '16by9'
  }

  get tag(){
    return this.getAttribute('tag') || 'div'
  }

  get type(){
    return this.getAttribute('type') || 'iframe'
  }
  render(){

    const wrapperClasses = ['embed-responsive', `embed-responsive-${this.aspect}`].join(' ')
    
    const embedClasses = "embed-responsive-item"

    const tag = this.tag
    const embedType = this.type;

    const wrapper = document.createElement(tag)
    wrapper.setAttribute('class', embedClasses)
    
    const embedEl = document.createElement(embedType)
    embedEl.setAttribute('class', embedClasses)

    // attr fall through
    Array.from(this.attributes).forEach(attr => {
      if(!BEmbed.observedAttrs.includes(attr.name)){
        embedEl.setAttribute(attr.name, attr.value)
      }
    })

    wrapper.appendChild(embedEl)
    this.shadowRoot.innerHTML =''
    this.shadowRoot.appendChild(wrapper)
  }
}
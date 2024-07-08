import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';


@customElement('simple-panel')
export class Panel extends LitElement {
  static styles = css`
    .panel {
      color: var(--text-colour, #fff); /* idk bro I want a global variable */
      text-decoration: none;
      display: block;
      user-select: none;
      cursor: pointer;
    }
    .panel_bg {
      background-size: cover;
      background-position: center;
      position: fixed;
      height: 100%;
      width: 100%;
      overflow: hidden;
      z-index: -1;
      filter: blur(10px);
      transition: 0.3s;
    }
    .panel_fg {
      height: 100%;
      text-align: center;
      align-content: center;
    }
    .panel_fg img {
      min-width: 100%;
      min-height: 100%
    }
    .panel:hover .panel_bg {
        filter: blur(0);
    }`;

  @property() href = '#';
  @property() bg_img = '';
  @property() topic = 'mising heading';
  @property() description = 'missing description';

  render() {
    return html`
      <div class="panel" href="/${this.href}">
        <div class="panel_bg" style="background-image: url('/images/${this.bg_img}');">
          <!-- <img src="/images/2.jpg" alt="Background Image" /> -->
        </div>

        <div class="panel_fg">
          <h1>${this.topic}</h1>
          <p>${this.description}</p>
        </div>
  </div>`;
  }
}

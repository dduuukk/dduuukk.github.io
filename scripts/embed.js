! function() {
    const M = ({
            buttonText: a,
            buttonClasses: t,
            buttonColor: e,
            buttonTextColor: o
        }) => `<button class="z-[999999999999] hidden fixed md:bottom-6 bottom-4 md:right-10 right-4 md:left-10 left-4 ${t.join(" ")} flex h-16 origin-center bg-red-50 transform cursor-pointer items-center
rounded-full py-4 px-6 text-base outline-none drop-shadow-md transition focus:outline-none fo
cus:ring-4 focus:ring-gray-600 focus:ring-opacity-50 active:scale-95" 
style="background-color:${e}; color:${o} z-index: 10001">
<div id="button-icon" class="mr-3 flex items-center justify-center">
  <svg
	class="h-7 w-7"
	fill="none"
	stroke="currentColor"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg">
	<path
	  strokeLinecap="round"
	  strokeLinejoin="round"
	  strokeWidth="2"
	  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
  </svg>
</div>
<div id="button" class="font-semibold leading-5 antialiased">${a}</div>
</button>`,
        P = ["data-button-text", "data-hide-button-icon", "data-button-position", "data-button-color", "data-button-text-color", "data-toggle-off"];
    class g extends HTMLElement {
        constructor() {
            super();
            const t = this.dataset,
                e = t.buttonText,
                o = t.buttonPosition,
                r = t.buttonColor,
                i = t.buttonTextColor,
                n = `<style>${window.Cal.__css}</style> ${M({ buttonText: e, buttonClasses: [g.updatedClassString(o, "")], buttonColor: r, buttonTextColor: i })}`;
            this.attachShadow({
                mode: "open"
            }), this.assertHasShadowRoot(), this.shadowRoot.innerHTML = n
        }
        static updatedClassString(t, e) {
            return [e.replace(/hidden|md:right-10|md:left-10|left-4|right-4/g, ""), t === "bottom-right" ? "md:right-10 right-4" : "md:left-10 left-4"].join(" ")
        }
        static get observedAttributes() {
            return P
        }
        attributeChangedCallback(t, e, o) {
            var s, h, p;
            const r = (s = this.shadowRoot) == null ? void 0 : s.querySelector("#button"),
                i = (h = this.shadowRoot) == null ? void 0 : h.querySelector("button"),
                n = (p = this.shadowRoot) == null ? void 0 : p.querySelector("#button-icon");
            if (!r) throw new Error("#button not found");
            if (!i) throw new Error("button element not found");
            if (!n) throw new Error("#button-icon not found");
            if (t === "data-button-text") r.textContent = o;
            else if (t === "data-hide-button-icon") n.style.display = o == "true" ? "none" : "block";
            else if (t === "data-button-position") i.className = g.updatedClassString(o, i.className);
            else if (t === "data-button-color") i.style.backgroundColor = o;
            else if (t === "data-button-text-color") i.style.color = o;
            else if (t === "data-toggle-off") {
                const l = o == "true";
                l && (this.buttonWrapperStyleDisplay = i.style.display), i.style.display = l ? "none" : this.buttonWrapperStyleDisplay
            } else console.log("Unknown attribute changed", t, e, o)
        }
        assertHasShadowRoot() {
            if (!this.shadowRoot) throw new Error("No shadow root")
        }
    }
    const $ = `@keyframes loader{0%{transform:rotate(0)}25%{transform:rotate(180deg)}50%{transform:rotate(180deg)}75%{transform:rotate(360deg)}to{transform:rotate(360deg)}}@keyframes loader-inner{0%{height:0%}25%{height:0%}50%{height:100%}75%{height:100%}to{height:0%}}.loader-inner{vertical-align:top;display:inline-block;width:100%;animation:loader-inner 2s infinite ease-in}.loader{display:block;width:30px;height:30px;position:relative;border-width:4px;border-style:solid;animation:loader 2s infinite ease}.loader.modal-loader{margin:60px auto}
`,
        E = a => a === "404" ? "Error Code: 404. Cal Link seems to be wrong." : `Error Code: ${a}. Something went wrong.`;

    function q(a) {
        const t = {};
        if (a === null) return t;
        for (const [e, o] of a)
            if (t.hasOwnProperty(e)) {
                let r = t[e];
                Array.isArray(r) || (r = [r]), r.push(o), t[e] = r
            } else t[e] = o;
        return t
    }
    const N = `<div id="wrapper" style="top:50%; left:50%;transform:translate(-50%,-50%)" class="absolute z-highest">
<div class="loader border-brand-default dark:border-darkmodebrand">
	<span class="loader-inner bg-brand dark:bg-darkmodebrand"></span>
</div>
<div id="error" style="transform:translate(-50%,-50%)" class="hidden">
Something went wrong.
</div>
</div>
<slot></slot>`;
    class H extends HTMLElement {
        static get observedAttributes() {
            return ["loading"]
        }
        assertHasShadowRoot() {
            if (!this.shadowRoot) throw new Error("No shadow root")
        }
        attributeChangedCallback(t, e, o) {
            this.assertHasShadowRoot();
            const r = this.shadowRoot.querySelector(".loader"),
                i = this.shadowRoot.querySelector("#error"),
                n = this.shadowRoot.querySelector("slot");
            if (!r || !n || !i) throw new Error("One of loaderEl, slotEl or errorEl is missing");
            if (t === "loading") {
                if (o == "done") r.style.display = "none";
                else if (o === "failed") {
                    r.style.display = "none", n.style.visibility = "hidden", i.style.display = "block";
                    const s = E(this.dataset.errorCode);
                    i.innerText = s
                }
            }
        }
        constructor() {
            super(), this.attachShadow({
                mode: "open"
            }), this.assertHasShadowRoot(), this.shadowRoot.innerHTML = `<style>${window.Cal.__css}</style><style>${$}</style>${N}`
        }
    }
    const T = `@keyframes loader{0%{transform:rotate(0)}25%{transform:rotate(180deg)}50%{transform:rotate(180deg)}75%{transform:rotate(360deg)}to{transform:rotate(360deg)}}@keyframes loader-inner{0%{height:0%}25%{height:0%}50%{height:100%}75%{height:100%}to{height:0%}}.loader-inner{vertical-align:top;display:inline-block;width:100%;animation:loader-inner 2s infinite ease-in}.loader{display:block;width:30px;height:30px;position:relative;border-width:4px;border-style:solid;animation:loader 2s infinite ease}.loader.modal-loader{margin:60px auto}
`,
        j = `<style>
.my-backdrop {
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:999999999999;
  display:block;
  background-color:rgb(5,5,5, 0.8)
}

.modal-box {
  margin:0 auto;
  margin-top:20px;
  margin-bottom:20px;
  position:absolute;
  width:100%;
  top:50%;
  left:50%;
  transform: translateY(-50%) translateX(-50%);
  overflow: auto;
}

.header {
  position: relative;
  float:right;
  top: 10px;
}
.close {
  font-size: 30px;
  left: -20px;
  position: relative;
  color:white;
  cursor: pointer;
}
/*Modal background is black only, so hardcode white */
.loader {
  --cal-brand-color:white;
}
</style>
<div class="my-backdrop">
<div class="header">
  <button type="button" class="close" aria-label="Close">&times;</button>
</div>
<div class="modal-box">
  <div class="body">
    <div id="wrapper" class="z-[999999999999] absolute flex w-full items-center">
      <div class="loader modal-loader border-brand-default dark:border-darkmodebrand">
        <span class="loader-inner bg-brand dark:bg-darkmodebrand"></span>
      </div>
      </div>
    <div id="error" class="hidden left-1/2 -translate-x-1/2 relative text-inverted"></div>
    <slot></slot>
  </div>
</div>
</div>`;
    class w extends HTMLElement {
        static get observedAttributes() {
            return ["state"]
        }
        assertHasShadowRoot() {
            if (!this.shadowRoot) throw new Error("No shadow root")
        }
        show(t) {
            this.assertHasShadowRoot(), this.shadowRoot.host.style.visibility = t ? "visible" : "hidden", t || (document.body.style.overflow = w.htmlOverflow)
        }
        open() {
            this.show(!0);
            const t = new Event("open");
            this.dispatchEvent(t)
        }
        close() {
            this.show(!1);
            const t = new Event("close");
            this.dispatchEvent(t)
        }
        hideIframe() {
            const t = this.querySelector("iframe");
            t && (t.style.visibility = "hidden")
        }
        showIframe() {
            const t = this.querySelector("iframe");
            t && (t.style.visibility = "")
        }
        getLoaderElement() {
            this.assertHasShadowRoot();
            const t = this.shadowRoot.querySelector(".loader");
            if (!t) throw new Error("No loader element");
            return t
        }
        getErrorElement() {
            this.assertHasShadowRoot();
            const t = this.shadowRoot.querySelector("#error");
            if (!t) throw new Error("No error element");
            return t
        }
        attributeChangedCallback(t, e, o) {
            if (t === "state")
                if (o === "loading") this.open(), this.hideIframe(), this.getLoaderElement().style.display = "block";
                else if (o == "loaded" || o === "reopening") this.open(), this.showIframe(), this.getLoaderElement().style.display = "none";
            else if (o == "closed") this.close();
            else if (o === "failed") {
                this.getLoaderElement().style.display = "none", this.getErrorElement().style.display = "inline-block";
                const r = E(this.dataset.errorCode);
                this.getErrorElement().innerText = r
            } else o === "prerendering" && this.close()
        }
        connectedCallback() {
            this.assertHasShadowRoot();
            const t = this.shadowRoot.querySelector(".close");
            document.addEventListener("keydown", e => {
                e.key === "Escape" && this.close()
            }, {
                once: !0
            }), this.shadowRoot.host.addEventListener("click", () => {
                this.close()
            }), t && (t.onclick = () => {
                this.close()
            })
        }
        constructor() {
            super();
            const t = `<style>${window.Cal.__css}</style><style>${T}</style>${j}`;
            this.attachShadow({
                mode: "open"
            }), w.htmlOverflow = document.body.style.overflow, document.body.style.overflow = "hidden", this.open(), this.assertHasShadowRoot(), this.shadowRoot.innerHTML = t
        }
    }
    const U = `.cal-embed{border:0px;min-height:300px;margin:0 auto;width:100%}
`;

    function b(a, t) {
        const e = new window.CustomEvent(a, {
            detail: t
        });
        window.dispatchEvent(e)
    }
    class C {
        static parseAction(t) {
            if (!t) return null;
            const [e, o, r] = t.split(":");
            return e !== "CAL" ? null : {
                ns: o,
                type: r
            }
        }
        getFullActionName(t) {
            return this.namespace ? `CAL:${this.namespace}:${t}` : `CAL::${t}`
        }
        fire(t, e) {
            const o = this.getFullActionName(t),
                r = {
                    type: t,
                    namespace: this.namespace,
                    fullType: o,
                    data: e
                };
            b(o, r), b(this.getFullActionName("*"), r)
        }
        on(t, e) {
            const o = this.getFullActionName(t);
            window.addEventListener(o, e)
        }
        off(t, e) {
            const o = this.getFullActionName(t);
            window.removeEventListener(o, e)
        }
        constructor(t) {
            t = t || "", this.namespace = t
        }
    }
    const _ = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:var(--font-inter),ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:Roboto Mono,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}[type=text],[type=email],[type=url],[type=password],[type=number],[type=date],[type=datetime-local],[type=month],[type=search],[type=tel],[type=time],[type=week],[multiple],textarea,select{-moz-appearance:none;-webkit-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0;padding:.5rem .75rem;font-size:1rem;line-height:1.5rem;--tw-shadow: 0 0 #0000}[type=text]:focus,[type=email]:focus,[type=url]:focus,[type=password]:focus,[type=number]:focus,[type=date]:focus,[type=datetime-local]:focus,[type=month]:focus,[type=search]:focus,[type=tel]:focus,[type=time]:focus,[type=week]:focus,[multiple]:focus,textarea:focus,select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow);border-color:#2563eb}input::-moz-placeholder,textarea::-moz-placeholder{color:#6b7280;opacity:1}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-top:0;padding-bottom:0}select{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-position:right .5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple]{background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:.75rem;-webkit-print-color-adjust:unset;print-color-adjust:unset}[type=checkbox],[type=radio]{-moz-appearance:none;-webkit-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow: 0 0 #0000}[type=checkbox]{border-radius:0}[type=radio]{border-radius:100%}[type=checkbox]:focus,[type=radio]:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset: var(--tw-empty, );--tw-ring-offset-width: 2px;--tw-ring-offset-color: #fff;--tw-ring-color: #2563eb;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}[type=checkbox]:checked,[type=radio]:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")}[type=radio]:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")}[type=checkbox]:checked:hover,[type=checkbox]:checked:focus,[type=radio]:checked:hover,[type=radio]:checked:focus{border-color:transparent;background-color:currentColor}[type=checkbox]:indeterminate{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type=checkbox]:indeterminate:hover,[type=checkbox]:indeterminate:focus{border-color:transparent;background-color:currentColor}[type=file]{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type=file]:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}*{scrollbar-color:initial;scrollbar-width:initial}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-4{bottom:1rem}.left-1\\/2{left:50%}.left-4{left:1rem}.right-4{right:1rem}.z-\\[999999999999\\]{z-index:999999999999}.mr-3{margin-right:.75rem}.flex{display:flex}.hidden{display:none}.h-16{height:4rem}.h-7{height:1.75rem}.w-7{width:1.75rem}.w-full{width:100%}.origin-center{transform-origin:center}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.bg-brand{background-color:var(--cal-brand-color, black)}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity))}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.text-base{font-size:1rem;line-height:1.5rem}.font-semibold{font-weight:600}.leading-5{line-height:1.25rem}.text-inverted{color:var(--cal-text-inverted, white)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.outline-none{outline:2px solid transparent;outline-offset:2px}.drop-shadow-md{--tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / .07)) drop-shadow(0 2px 2px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}@font-face{font-family:Cal Sans;src:url(https://cal.com/cal.ttf)}h1,h2,h3,h4,h5,h6{font-family:Cal Sans;font-weight:400;letter-spacing:normal}html,body,:host{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-gray-600:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(75 85 99 / var(--tw-ring-opacity))}.focus\\:ring-opacity-50:focus{--tw-ring-opacity: .5}.active\\:scale-95:active{--tw-scale-x: .95;--tw-scale-y: .95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@media (min-width: 768px){.md\\:bottom-6{bottom:1.5rem}.md\\:left-10{left:2.5rem}.md\\:right-10{right:2.5rem}}
`,
        B = "https://app.cal.com";
    customElements.define("cal-modal-box", w);
    customElements.define("cal-floating-button", g);
    customElements.define("cal-inline", H);
    const d = window.Cal;
    if (!d || !d.q) throw new Error("Cal is not defined. This shouldn't happen");
    D();
    document.head.appendChild(document.createElement("style")).innerHTML = U;

    function m(a, t) {
        function e(r, i) {
            return typeof i == "string" ? typeof r == i : r instanceof i
        }

        function o(r) {
            return typeof r > "u"
        }
        if (t.required && o(a)) throw new Error("Argument is required");
        for (const [r, i] of Object.entries(t.props || {})) {
            if (i.required && o(a[r])) throw new Error(`"${r}" is required`);
            let n = !0;
            if (i.type && !o(a[r]) && (i.type instanceof Array ? i.type.forEach(s => {
                    n = n || e(a[r], s)
                }) : n = e(a[r], i.type)), !n) throw new Error(`"${r}" is of wrong type.Expected type "${i.type}"`)
        }
    }

    function S(a) {
        const t = getComputedStyle(a).colorScheme;
        return t === "dark" || t === "light" ? t : null
    }

    function y(a, t) {
        if (!a["ui.color-scheme"]) {
            const e = S(t);
            e && (a["ui.color-scheme"] = e)
        }
        return a
    }
    const O = (a, t) => !![...["month", "date", "slot", "rescheduleUid", "bookingUid", "duration", "overlayCalendar"]].includes(a);
    class f {
        constructor(t, e) {
            this.iframeDoQueue = [], this.__config = {
                calOrigin: B
            }, this.api = new z(this), this.namespace = t, this.actionManager = new C(t), f.actionsManagers = f.actionsManagers || {}, f.actionsManagers[t] = this.actionManager, this.processQueue(e), this.actionManager.on("__dimensionChanged", o => {
                const {
                    data: r
                } = o.detail, i = this.iframe;
                if (!i) return;
                const n = "px";
                r.iframeHeight && (i.style.height = r.iframeHeight + n), this.modalBox && (i.style.maxHeight = `${window.innerHeight - 100}px`)
            }), this.actionManager.on("__iframeReady", () => {
                this.iframeReady = !0, this.iframe && (this.iframe.style.visibility = ""), this.doInIframe({
                    method: "parentKnowsIframeReady"
                }), this.iframeDoQueue.forEach(o => {
                    this.doInIframe(o)
                })
            }), this.actionManager.on("__routeChanged", () => {
                if (!this.inlineEl) return;
                const {
                    top: o,
                    height: r
                } = this.inlineEl.getBoundingClientRect();
                o < 0 && Math.abs(o / r) >= .25 && this.inlineEl.scrollIntoView({
                    behavior: "smooth"
                })
            }), this.actionManager.on("linkReady", () => {
                var o, r;
                this.isPerendering || ((o = this.modalBox) == null || o.setAttribute("state", "loaded"), (r = this.inlineEl) == null || r.setAttribute("loading", "done"))
            }), this.actionManager.on("linkFailed", o => {
                var i, n, s, h;
                this.iframe && ((i = this.inlineEl) == null || i.setAttribute("data-error-code", o.detail.data.code), (n = this.modalBox) == null || n.setAttribute("data-error-code", o.detail.data.code), (s = this.inlineEl) == null || s.setAttribute("loading", "failed"), (h = this.modalBox) == null || h.setAttribute("state", "failed"))
            })
        }
        static ensureGuestKey(t) {
            return t = t || {}, {
                ...t,
                guest: t.guests ?? void 0
            }
        }
        processInstruction(t) {
            const e = [].slice.call(t);
            if (typeof e[0] != "string") {
                e.forEach(i => {
                    this.processInstruction(i)
                });
                return
            }
            const [o, ...r] = e;
            this.api[o] || x(`Instruction ${o} not FOUND`);
            try {
                this.api[o](...r)
            } catch (i) {
                x("Instruction couldn't be executed", i)
            }
            return e
        }
        processQueue(t) {
            t.forEach(e => {
                this.processInstruction(e)
            }), t.splice(0), t.push = e => {
                this.processInstruction(e)
            }
        }
        createIframe({
            calLink: t,
            config: e = {},
            calOrigin: o
        }) {
            const r = this.iframe = document.createElement("iframe");
            r.className = "cal-embed", r.name = `cal-embed=${this.namespace}`, r.title = "Book a call";
            const i = this.getInitConfig(),
                {
                    iframeAttrs: n,
                    ...s
                } = e;
            n && n.id && r.setAttribute("id", n.id);
            const h = this.buildFilteredQueryParams(s),
                p = (o || i.calOrigin || "").replace("https://cal.com", "https://app.cal.com"),
                l = new URL(`${p}/${t}`);
            l.pathname.endsWith("embed") || (l.pathname = `${l.pathname}/embed`), window.ENABLE_FUTURE_ROUTES && (l.pathname = `/future${l.pathname}`), l.searchParams.set("embed", this.namespace), i.debug && l.searchParams.set("debug", `${i.debug}`), r.style.visibility = "hidden", i.uiDebug && (r.style.border = "1px solid green");
            for (const [c, u] of h) l.searchParams.append(c, u);
            return r.src = l.toString(), r
        }
        getInitConfig() {
            return this.__config
        }
        doInIframe(t) {
            if (!this.iframeReady) {
                this.iframeDoQueue.push(t);
                return
            }
            if (!this.iframe) throw new Error("iframe doesn't exist. `createIframe` must be called before `doInIframe`");
            this.iframe.contentWindow && this.iframe.contentWindow.postMessage({
                originator: "CAL",
                method: t.method,
                arg: t.arg
            }, "*")
        }
        filterParams(t) {
            return Object.fromEntries(Object.entries(t).filter(([e, o]) => !O(e)))
        }
        buildFilteredQueryParams(t) {
            var n;
            const o = {
                    ...(n = d.config) != null && n.forwardQueryParams ? F() : {},
                    ...t
                },
                r = this.filterParams(o),
                i = new URLSearchParams;
            for (const [s, h] of Object.entries(r)) h !== void 0 && (h instanceof Array ? h.forEach(p => i.append(s, p)) : i.set(s, h));
            return i
        }
    }
    const A = class R {
        constructor(t) {
            this.cal = t
        }
        init(t, e = {}) {
            let o = "";
            if (typeof t != "string" ? e = t || {} : o = t, o !== this.cal.namespace) return;
            R.initializedNamespaces.push(this.cal.namespace);
            const {
                calOrigin: r,
                origin: i,
                ...n
            } = e;
            this.cal.__config.calOrigin = r || i || this.cal.__config.calOrigin, this.cal.__config = {
                ...this.cal.__config,
                ...n
            }
        }
        initNamespace(t) {
            d.ns[t].instance = d.ns[t].instance || new f(t, d.ns[t].q)
        }
        inline({
            calLink: t,
            elementOrSelector: e,
            config: o
        }) {
            if (m(arguments[0], {
                    required: !0,
                    props: {
                        calLink: {
                            required: !0,
                            type: "string"
                        },
                        elementOrSelector: {
                            required: !0,
                            type: ["string", HTMLElement]
                        },
                        config: {
                            required: !1,
                            type: Object
                        }
                    }
                }), this.cal.inlineEl && document.body.contains(this.cal.inlineEl)) {
                console.warn("Inline embed already exists. Ignoring this call");
                return
            }
            if (o = o || {}, typeof o.iframeAttrs == "string" || o.iframeAttrs instanceof Array) throw new Error("iframeAttrs should be an object");
            const r = e instanceof HTMLElement ? e : document.querySelector(e);
            if (!r) throw new Error("Element not found");
            o.embedType = "inline";
            const i = this.cal.getInitConfig(),
                n = this.cal.createIframe({
                    calLink: t,
                    config: y(f.ensureGuestKey(o), r),
                    calOrigin: i.calOrigin
                });
            n.style.height = "100%", n.style.width = "100%", r.classList.add("cal-inline-container");
            const s = document.createElement("template");
            s.innerHTML = '<cal-inline style="max-height:inherit;height:inherit;min-height:inherit;display:flex;position:relative;flex-wrap:wrap;width:100%"></cal-inline><style>.cal-inline-container::-webkit-scrollbar{display:none}.cal-inline-container{scrollbar-width:none}</style>', this.cal.inlineEl = s.content.children[0], this.cal.inlineEl.appendChild(n), r.appendChild(s.content)
        }
        floatingButton({
            calLink: t,
            buttonText: e = "Book my Cal",
            hideButtonIcon: o = !1,
            attributes: r,
            buttonPosition: i = "bottom-right",
            buttonColor: n = "rgb(0, 0, 0)",
            buttonTextColor: s = "rgb(255, 255, 255)",
            calOrigin: h,
            config: p
        }) {
            let l = null;
            r != null && r.id && (l = document.getElementById(r.id));
            let c;
            l ? c = l : (c = document.createElement("cal-floating-button"), c.dataset.calLink = t, c.dataset.calNamespace = this.cal.namespace, c.dataset.calOrigin = h ?? "", p && (c.dataset.calConfig = JSON.stringify(p)), r != null && r.id && (c.id = r.id), document.body.appendChild(c));
            const u = c.dataset;
            u.buttonText = e, u.hideButtonIcon = `${o}`, u.buttonPosition = `${i}`, u.buttonColor = `${n}`, u.buttonTextColor = `${s}`
        }
        modal({
            calLink: t,
            config: e = {},
            calOrigin: o,
            __prerender: r = !1
        }) {
            const i = this.modalUid || this.preloadedModalUid || String(Date.now()) || "0",
                n = this.preloadedModalUid && !this.modalUid,
                s = document.body;
            this.cal.isPerendering = !!r, r && (e.prerender = "true");
            const h = y(f.ensureGuestKey(e), s),
                p = document.querySelector(`cal-modal-box[uid="${i}"]`);
            if (p)
                if (n) {
                    this.cal.doInIframe({
                        method: "connect",
                        arg: h
                    }), this.modalUid = i, p.setAttribute("state", "loading");
                    return
                } else {
                    p.setAttribute("state", "reopening");
                    return
                } if (r && (this.preloadedModalUid = i), typeof e.iframeAttrs == "string" || e.iframeAttrs instanceof Array) throw new Error("iframeAttrs should be an object");
            e.embedType = "modal";
            let l = null;
            l || (l = this.cal.createIframe({
                calLink: t,
                config: h,
                calOrigin: o || null
            })), l.style.borderRadius = "8px", l.style.height = "100%", l.style.width = "100%";
            const c = document.createElement("template");
            c.innerHTML = `<cal-modal-box uid="${i}"></cal-modal-box>`, this.cal.modalBox = c.content.children[0], this.cal.modalBox.appendChild(l), r && this.cal.modalBox.setAttribute("state", "prerendering"), this.handleClose(), s.appendChild(c.content)
        }
        handleClose() {
            this.cal.actionManager.on("__closeIframe", () => {
                var t;
                (t = this.cal.modalBox) == null || t.setAttribute("state", "closed")
            })
        }
        on({
            action: t,
            callback: e
        }) {
            m(arguments[0], {
                required: !0,
                props: {
                    action: {
                        required: !0,
                        type: "string"
                    },
                    callback: {
                        required: !0,
                        type: Function
                    }
                }
            }), this.cal.actionManager.on(t, e)
        }
        off({
            action: t,
            callback: e
        }) {
            this.cal.actionManager.off(t, e)
        }
        preload({
            calLink: t,
            type: e,
            options: o = {}
        }) {
            m(arguments[0], {
                required: !0,
                props: {
                    calLink: {
                        type: "string",
                        required: !0
                    },
                    type: {
                        type: "string",
                        required: !1
                    },
                    options: {
                        type: Object,
                        required: !1
                    }
                }
            });
            let r = d;
            const i = this.cal.namespace;
            if (i && (r = d.ns[i]), !r) throw new Error(`Namespace ${i} isn't defined`);
            const n = this.cal.getInitConfig();
            let s = o.prerenderIframe;
            if (e && s === void 0 && (s = !0), !e && s) throw new Error("You should provide 'type'");
            s ? e === "modal" || e === "floatingButton" ? (this.cal.isPerendering = !0, this.modal({
                calLink: t,
                calOrigin: n.calOrigin,
                __prerender: !0
            })) : (console.warn("Ignoring - full preload for inline embed and instead preloading assets only"), v({
                calLink: t,
                config: n
            })) : v({
                calLink: t,
                config: n
            })
        }
        prerender({
            calLink: t,
            type: e
        }) {
            this.preload({
                calLink: t,
                type: e
            })
        }
        ui(t) {
            m(t, {
                required: !0,
                props: {
                    theme: {
                        required: !1,
                        type: "string"
                    },
                    styles: {
                        required: !1,
                        type: Object
                    }
                }
            }), this.cal.doInIframe({
                method: "ui",
                arg: t
            })
        }
    };
    A.initializedNamespaces = [];
    let z = A;

    function F() {
        const a = new URLSearchParams(window.location.search);
        return q(a.entries())
    }
    const I = "";
    d.instance = new f(I, d.q);
    for (const [a, t] of Object.entries(d.ns)) t.instance = t.instance ?? new f(a, t.q);
    window.addEventListener("message", a => {
        const t = a.data,
            e = t.fullType,
            o = C.parseAction(e);
        if (!o) return;
        const r = f.actionsManagers[o.ns];
        if (d.__logQueue = d.__logQueue || [], d.__logQueue.push({
                ...o,
                data: t.data
            }), !r) throw new Error(`Unhandled Action ${o}`);
        r.fire(o.type, t.data)
    });
    document.addEventListener("click", a => {
        var l;
        const t = a.target,
            e = p(t),
            o = (l = e == null ? void 0 : e.dataset) == null ? void 0 : l.calLink;
        if (!o) return;
        const r = e.dataset.calNamespace,
            i = e.dataset.calConfig || "",
            n = e.dataset.calOrigin || "";
        let s;
        try {
            s = JSON.parse(i)
        } catch {
            s = {}
        }
        let h = d;
        if (r && (h = d.ns[r]), !h) throw new Error(`Namespace ${r} isn't defined`);
        h("modal", {
            calLink: o,
            config: s,
            calOrigin: n
        });

        function p(c) {
            let u;
            return !(c instanceof HTMLElement) || (c != null && c.dataset.calLink ? u = c : u = Array.from(document.querySelectorAll("[data-cal-link]")).find(L => L.contains(c)), !(u instanceof HTMLElement)) ? null : u
        }
    });
    let k = null;
    (function() {
        setInterval(() => {
            const t = S(document.body);
            t && t !== k && (k = t, z.initializedNamespaces.forEach(e => {
                Q(e)("ui", {
                    colorScheme: t
                })
            }))
        }, 50)
    })();

    function Q(a) {
        let t;
        return a === I ? t = d : t = d.ns[a], t
    }

    function v({
        config: a,
        calLink: t
    }) {
        const e = document.body.appendChild(document.createElement("iframe")),
            o = new URL(`${a.calOrigin}/${t}`);
        o.searchParams.set("preload", "true"), e.src = o.toString(), e.style.width = "0", e.style.height = "0", e.style.display = "none"
    }

    function D() {
        d.fingerprint = "ab1eab9", d.version = "1.5.1", d.__css = _, d.config || (d.config = {}), d.config.forwardQueryParams = d.config.forwardQueryParams ?? !1
    }

    function x(...a) {
        console.log(...a)
    }
}()
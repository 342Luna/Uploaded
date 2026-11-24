const container = document.getElementById('content');
       const elements = Array.from(container.children);
       container.innerHTML = '';

       const typingSpeed = 30;      
       const fastTypingSpeed = 2;    
       let isTyping = true;
       let skipRequested = false;

       // Listen for the Enter key
       document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
               if (isTyping) {
                   // If still typing, trigger the skip
                   skipRequested = true;
               }
            }
            if (event.key === '1') {
                window.location.href = 'PHP/Intro/UploadedMain.HTML';
            } else if (event.key === '2') {
                window.location.href = 'JS/Intro/UploadedMain.HTML';
            }
       });

       function showFinalPrompt() {
           isTyping = false;
           // Remove any leftover cursors
           document.querySelectorAll('.cursor').forEach(el => el.classList.remove('cursor'));
           
           const promptEl = document.createElement('p');
           promptEl.id = 'prompt-msg';
           promptEl.classList.add('cursor');
           promptEl.textContent = '[ Press [1] to continue in PHP OR Press [2] to continue in JS ]';
           container.appendChild(promptEl);
       }

       function instantFinish() {
           // Clear partial typing and dump all original elements immediately
           container.innerHTML = '';
           elements.forEach(el => container.appendChild(el));
           showFinalPrompt();
       }

       async function typeElement(el) {
           if (el.tagName === 'HR' || el.tagName === 'BR') {
               container.appendChild(el);
               return;
           }

           // Determine the speed based on whether the tag is a PRE
           const currentSpeed = (el.tagName === 'PRE') ? fastTypingSpeed : typingSpeed;

           const clone = document.createElement(el.tagName);
           // Copy any classes/attributes if needed, or just let it create the tag
           clone.classList.add('cursor');
           container.appendChild(clone);

           const fullHTML = el.innerHTML;
           let currentHTML = '';
           let i = 0;

           while (i < fullHTML.length) {
               if (skipRequested) return; // Stop loop immediately if skipped

               if (fullHTML[i] === '<') {
                   const tagEnd = fullHTML.indexOf('>', i);
                   currentHTML += fullHTML.slice(i, tagEnd + 1);
                   i = tagEnd + 1;
               } else {
                   currentHTML += fullHTML[i];
                   i++;
                   clone.innerHTML = currentHTML;
                   await new Promise(resolve => setTimeout(resolve, currentSpeed));
               }
           }
           
           clone.classList.remove('cursor');
       }

       async function startTyping() {
           for (const el of elements) {
               if (skipRequested) {
                   instantFinish();
                   return;
               }
               await typeElement(el);
               
               if (skipRequested) {
                   instantFinish();
                   return;
               }
               await new Promise(resolve => setTimeout(resolve, 200));
           }
           showFinalPrompt();
       }

       startTyping();
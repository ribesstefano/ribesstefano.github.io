document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    // Remove any existing code action buttons (like the </> symbol)
    const existingButtons = codeBlock.parentNode.querySelectorAll('.code-action, .highlight-copy-btn, button[title*="Copy"]');
    existingButtons.forEach(btn => btn.remove());
    
    // Check if wrapper already exists
    if (codeBlock.parentNode.classList.contains('code-block-wrapper')) {
      return;
    }
    
    // Create a wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.setAttribute('title', 'Copy to clipboard');
    
    // Wrap the code block
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(copyButton);
    wrapper.appendChild(codeBlock);
    
    // Add click event to copy button
    copyButton.addEventListener('click', function() {
      const code = codeBlock.querySelector('code') || codeBlock;
      const text = code.textContent;
      
      navigator.clipboard.writeText(text).then(function() {
        // Change button appearance temporarily
        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        copyButton.classList.add('copied');
        
        setTimeout(function() {
          copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        copyButton.classList.add('error');
        setTimeout(function() {
          copyButton.classList.remove('error');
        }, 2000);
      });
    });
  });
});
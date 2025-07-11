// Flex Videos Simple Overlay
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('flex-videos-flyout-overlay');
  var items = document.querySelectorAll('.flex-videos-item-has-overlay');
  
  if (!overlay || !items.length) return;
  
  function showOverlay(item) {
    var rect = item.getBoundingClientRect();
    var title = item.getAttribute('data-title') || '';
    var desc = item.getAttribute('data-desc') || '';
    var thumbUrl = item.getAttribute('data-thumb') || '';
    
    var html = '';
    if (thumbUrl) html += '<img class="flex-videos-overlay-thumb" src="'+thumbUrl+'" alt="Large Thumbnail">';
    if (title) html += '<h2 class="flex-videos-overlay-title">'+title+'</h2>';
    if (desc) html += '<p class="flex-videos-overlay-desc">'+desc+'</p>';
    
    overlay.innerHTML = html;
    overlay.style.display = 'flex';
    // Remove animation class if present, then force reflow, then add
    overlay.classList.remove('flex-videos-animate');
    void overlay.offsetWidth;
    overlay.classList.add('flex-videos-animate');
    overlay.style.opacity = '0.95';
    
    // Get overlay dimensions after content is set
    var overlayWidth = 350;
    var overlayHeight = overlay.offsetHeight || 300;
    
    // Position to the right of the thumbnail
    var left = rect.right + 15;
    var top = rect.top;
    
    // Check if overlay would go off bottom of screen
    if (top + overlayHeight > window.innerHeight) {
      top = window.innerHeight - overlayHeight - 20;
      if (top < 20) top = 20;
    }
    
    // If not enough space on right, try left
    if (left + overlayWidth > window.innerWidth) {
      left = rect.left - overlayWidth - 15;
    }
    
    // If still not enough space, center above
    if (left < 0) {
      left = rect.left + (rect.width / 2) - (overlayWidth / 2);
      top = rect.top - overlayHeight - 15;
      if (top < 20) top = rect.bottom + 15;
    }
    
    // Final boundary checks
    if (left < 20) left = 20;
    if (left + overlayWidth > window.innerWidth - 20) {
      left = window.innerWidth - overlayWidth - 20;
    }
    
    overlay.style.left = left + 'px';
    overlay.style.top = top + 'px';
  }
  
  function hideOverlay() {
    overlay.style.opacity = '0';
    overlay.classList.remove('flex-videos-animate');
    setTimeout(function() {
      overlay.style.display = 'none';
    }, 400);
  }
  
  items.forEach(function(item) {
    item.addEventListener('mouseenter', function() { 
      clearTimeout(window.flexVideosHideTimer);
      showOverlay(item); 
    });
    item.addEventListener('mouseleave', function() {
      window.flexVideosHideTimer = setTimeout(hideOverlay, 100);
    });
  });
  
  // Keep overlay visible when hovering over it
  overlay.addEventListener('mouseenter', function() {
    clearTimeout(window.flexVideosHideTimer);
  });
  
  overlay.addEventListener('mouseleave', function() {
    window.flexVideosHideTimer = setTimeout(hideOverlay, 100);
  });
  
  // Hide on scroll
  window.addEventListener('scroll', hideOverlay);
});

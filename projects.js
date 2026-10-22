'use strict';

// All project content lives in the initial HTML. Native dialogs enhance that
// content; ordinary fragment links remain useful without JavaScript.
(() => {
  const root = document.documentElement;
  const contents = [...document.querySelectorAll('[data-project-preview]')];
  if (typeof HTMLDialogElement === 'undefined' || !('showModal' in HTMLDialogElement.prototype)) {
    root.dataset.projectsStatic = '';
    contents.forEach(content => {content.hidden = false;});
    return;
  }
  const projects = new Map();
  let active = null;
  let renderedHash;
  let nextInvoker = null;
  let nextSection = null;
  let closingRequested = false;
  const motion = () => window.portfolioMotion.enabled && !document.hidden;

  function route(hash) {
    let id;
    try {id = decodeURIComponent(hash.slice(1));} catch {return null;}
    for (const project of projects.values()) {
      if (id === project.id) return {project,target:null};
      const target = document.getElementById(id);
      if (id.startsWith(project.id + '-') && target && project.content.contains(target)) return {project,target};
    }
    return null;
  }
  function refresh(project) {
    dispatchEvent(new CustomEvent('portfolio:layoutchange', {detail:{target:project.content}}));
  }
  function cancelAnimations(project) {
    project.animations.forEach(animation => animation.cancel());
    project.animations = [];
  }
  function updateTriggers(project) {
    for (const trigger of project.triggers) trigger.setAttribute('aria-expanded', String(project.open));
  }
  function finish(project, restoreFocus = true) {
    cancelAnimations(project);
    if (!project.open) {
      project.dialog.close();
      project.content.hidden = true;
      project.content.inert = true;
      if (active === project) active = null;
      if (![...projects.values()].some(item => item.open)) root.classList.remove('has-project-preview');
      if (restoreFocus && !active) {
        (project.invoker?.isConnected ? project.invoker : project.artwork)?.focus({preventScroll:true});
        if (nextSection) {
          const section = nextSection;
          nextSection = null;
          section.setAttribute('tabindex', '-1');
          section.focus({preventScroll:true});
          section.scrollIntoView({behavior:motion() ? 'smooth' : 'instant',block:'start'});
        }
      }
    }
    refresh(project);
  }
  function present(project, open, immediate = false, restoreFocus = true) {
    const version = ++project.version;
    const wasOpen = project.dialog.open;
    const style = getComputedStyle(project.dialog);
    const from = wasOpen ? {opacity:style.opacity,transform:style.transform}
      : {opacity:0,transform:'translateY(20px) scale(.97)'};
    cancelAnimations(project);
    project.open = open;
    updateTriggers(project);
    project.dialog.classList.toggle('is-closing', !open);
    if (open) {
      project.content.hidden = false;
      project.content.inert = false;
      root.classList.add('has-project-preview');
      if (!wasOpen) {project.dialog.showModal();project.dialog.scrollTop = 0;}
    } else {
      project.content.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      if ('hidePopover' in HTMLElement.prototype) {
        project.content.querySelectorAll('[popover]').forEach(popover => {
          if (popover.matches(':popover-open')) popover.hidePopover();
        });
      }
      project.content.inert = true;
    }
    if (immediate || !motion() || !project.dialog.animate || !open && !wasOpen) {
      finish(project, restoreFocus);
      return;
    }
    const easing = getComputedStyle(root).getPropertyValue('--ease-out').trim();
    project.animations.push(project.dialog.animate([from,open ? {opacity:1,transform:'translateY(0) scale(1)'} : {opacity:0,transform:'translateY(12px) scale(.985)'}],
      {duration:open ? 420 : 220,easing,fill:'both'}));
    if (open && !wasOpen) {
      for (const [index,element] of [...project.content.querySelectorAll('.story-copy,.story-stage')].entries()) {
        project.animations.push(element.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:350,delay:60 + index * 40,easing,fill:'both'}));
      }
    }
    Promise.all(project.animations.map(animation => animation.finished)).then(() => {
      if (project.version === version) finish(project, restoreFocus);
    }, () => {});
    refresh(project);
  }
  function revealTarget(project, target) {
    if (!target) return;
    // Only the popup scrolls. The page underneath keeps its original position.
    project.dialog.scrollTo({top:target.getBoundingClientRect().top - project.dialog.getBoundingClientRect().top + project.dialog.scrollTop - 106,behavior:motion() ? 'smooth' : 'instant'});
    const heading = target.matches('h3,h4,h5') ? target : target.querySelector('h3,h4,h5');
    if (heading) {heading.setAttribute('tabindex', '-1');heading.focus({preventScroll:true});}
  }
  function syncRoute() {
    if (renderedHash === location.hash) return;
    renderedHash = location.hash;
    closingRequested = false;
    const destination = route(location.hash);
    if (!destination) {
      if (active) present(active, false);
      nextInvoker = null;
      return;
    }
    const {project,target} = destination;
    if (active && active !== project) present(active, false, true, false);
    const wasOpen = project.open;
    active = project;
    if (!wasOpen) {
      project.invoker = nextInvoker && !nextInvoker.closest('.project-dialog') ? nextInvoker : project.artwork;
      present(project, true);
    }
    nextInvoker = null;
    if (target) requestAnimationFrame(() => revealTarget(project, target));
    else if (wasOpen) project.dialog.scrollTo({top:0,behavior:motion() ? 'smooth' : 'instant'});
  }
  function navigate(hash, invoker) {
    nextInvoker = invoker;
    if (route(location.hash)) history.replaceState(history.state, '', hash);
    else history.pushState({...history.state,portfolioProject:{owned:true,returnHash:location.hash}}, '', hash);
    // Reopening the current route can reverse an in-flight dismissal.
    renderedHash = undefined;
    syncRoute();
  }
  function requestClose() {
    if (!active?.open || closingRequested) return;
    closingRequested = true;
    if (history.state?.portfolioProject?.owned) history.back();
    else {
      history.replaceState(null, '', '#projects');
      renderedHash = undefined;
      syncRoute();
    }
  }

  for (const content of contents) {
    const id = content.dataset.projectPreview;
    const dialog = document.createElement('dialog');
    dialog.id = id + '-modal';
    dialog.className = 'project-dialog';
    dialog.dataset.project = id;
    dialog.setAttribute('aria-labelledby', id + '-project-name');
    dialog.setAttribute('aria-describedby', id + '-description');
    content.after(dialog);dialog.append(content);
    const artwork = document.querySelector('[data-project-open="' + id + '"]');
    const project = {id,content,dialog,artwork,invoker:artwork,triggers:[],open:false,animations:[],version:0};
    projects.set(id,project);
    content.hidden = true;content.inert = true;
    content.querySelector('.story-close').hidden = false;
    content.querySelector('.story-close').addEventListener('click', requestClose);
    dialog.addEventListener('cancel', event => {
      if (event.target === dialog) {event.preventDefault();requestClose();}
    });
    let backdropPress = false;
    const outside = event => {
      const bounds = dialog.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    };
    dialog.addEventListener('pointerdown', event => {backdropPress = event.target === dialog && outside(event);});
    dialog.addEventListener('click', event => {
      if (backdropPress && event.target === dialog && outside(event)) requestClose();
      backdropPress = false;
    });
    dialog.addEventListener('close', event => {
      if (event.target === dialog && !dialog.open && project.open) requestClose();
    });
    artwork.disabled = false;
    artwork.addEventListener('click', () => {
      if (active === project && project.open) requestClose();
      else navigate('#' + id, artwork);
    });
  }
  for (const project of projects.values()) {
    project.triggers = [project.artwork,...[...document.querySelectorAll('a[href]')].filter(link => {
      const url = new URL(link.href);
      return url.origin === location.origin && url.pathname === location.pathname &&
        route(url.hash)?.project === project && !project.content.contains(link);
    })];
    for (const trigger of project.triggers) {
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-controls', project.dialog.id);
      trigger.setAttribute('aria-expanded', 'false');
    }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    if (route(url.hash)) {
      event.preventDefault();navigate(url.hash, link);
    } else if (active && active.dialog.contains(link)) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();nextSection = target;
      history.replaceState(null, '', url.hash);syncRoute();
    }
  });
  addEventListener('popstate', syncRoute);
  addEventListener('hashchange', syncRoute);
  addEventListener('portfolio:motionchange', () => {
    for (const project of projects.values()) if (project.animations.length) {++project.version;finish(project);}
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) for (const project of projects.values()) if (project.animations.length) {++project.version;finish(project);}
  });
  addEventListener('pagehide', () => {
    for (const project of projects.values()) {
      ++project.version;project.open = false;cancelAnimations(project);
      project.content.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      project.dialog.close();project.content.hidden = true;project.content.inert = true;updateTriggers(project);
    }
    active = null;renderedHash = undefined;root.classList.remove('has-project-preview');
  });
  addEventListener('pageshow', event => {if (event.persisted) syncRoute();});
  syncRoute();
})();

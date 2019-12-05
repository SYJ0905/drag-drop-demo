;(function() {
  // Drag and Drop Basic 1 time
  let dragSource = document.querySelector('#drag_drop_basic #drag_source_basic');
  let dropTarget = document.querySelector('#drag_drop_basic .target_container');
  dragSource.addEventListener('dragstart', dragStart);
  dragSource.addEventListener('dragend', dragEnd);
  dropTarget.addEventListener('drop', droped);
  dropTarget.addEventListener('dragenter', cancelDefault);
  dropTarget.addEventListener('dragover', dragover);
  dropTarget.addEventListener('dragleave', dragLeave);

  // Drag and Drop with multiple sources in multiple containers
  let dragSources_multiple = document.querySelectorAll('#drag_drop_multiple #drag_source_multiple');
  let dropTargets_multiple = document.querySelectorAll('[data-role="drag_drop_container"]');
  dragSources_multiple.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });
  dropTargets_multiple.forEach(item => {
    item.addEventListener('drop', droped);
    item.addEventListener('dragenter', cancelDefault);
    item.addEventListener('dragover', dragover);
    item.addEventListener('dragleave', dragLeave);
  });

  // Drag and Drop 共用 function
  function dragStart(e) {
    console.log(e.target.id);
    console.log('dragstart', '拖曳開始');
    e.dataTransfer.setData('text/plain', e.target.id);
    // e.target 與 this 相同
    this.classList.add('dragging');
  }
  function dragEnd(e) {
    console.log('dragend', '拖曳結束');
    this.classList.remove('dragging');
  }
  function droped(e) {
    console.log('drop', '使用者放掉時執行的行為');
    e.preventDefault();
    e.stopPropagation();
    let id = e.dataTransfer.getData('text/plain');
    e.target.appendChild(document.querySelector(`#${id}`));
    this.classList.remove('hover');
  }
  function dragover(e) {
    console.log('dragover', '拖曳物在區塊內');
    cancelDefault(e);
    this.classList.add('hover');
  }
  function dragLeave(e) {
    console.log('dragleave', '拖曳物離開可放置區塊時觸發');
    this.classList.remove('hover');
  }
  function cancelDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    return false; // 可加可不加
  }

  // 拖曳選單排序
  let listItems = Array.from(document.querySelectorAll('.drag_sort_enable li'));
  listItems.forEach((item) => {
    item.setAttribute('draggable', true);
    item.addEventListener('dragstart', drag_sort_Start);
    item.addEventListener('drop', drop_sort);
    item.addEventListener('dragenter', cancelDefault);
    item.addEventListener('dragover', cancelDefault);
  });
  function drag_sort_Start (e) {
    let index = $(e.target).index();
    e.dataTransfer.setData('text/plain', index);
  }
  function drop_sort (e) {
    console.log(e.currentTarget);
    console.log('e.target', e.target);
    console.log('e.currentTarget', e.currentTarget);
    console.log('this', this);
    console.log('$(this)', $(this));
    console.log('$(e.target)', $(e.target));
    console.log('$(e.currentTarget)', $(e.currentTarget));
    let oldIndex = e.dataTransfer.getData('text/plain');
    let newIndex = $(e.target).index();
    let dropped = $(e.target).parent().children().eq(oldIndex);
    if (newIndex < oldIndex) {
      dropped.remove();
      $(e.target).before(dropped);
    } else if (newIndex > oldIndex) {
      dropped.remove();
      $(e.target).after(dropped);
    }
  }
})();
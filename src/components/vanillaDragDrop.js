import React, { useEffect } from "react";

const VanillaDragDrop = props => { 
  let pickedFrom = ""
  let droppedAt = ""
  const dropZoneClasses = (props.dropZoneClasses || "drop-zone")
  const draggableClasses = "draggable " + (props.draggableClasses || "")
  useEffect(() => {
    initDragAndDrop()
  }, [])


  function initDragAndDrop() {
    // Collect all draggable elements and drop zones
    let draggables = document.querySelectorAll(".draggable");
    let dropZones = document.querySelectorAll(".drop-zone");
    initDraggables(draggables);
    initDropZones(dropZones);
  }

  function initDraggables(draggables) {
    for (const draggable of draggables) {
      initDraggable(draggable);
    }
  }

  function initDropZones(dropZones) {
    for (let dropZone of dropZones) {
      initDropZone(dropZone);
    }
  }

  /**
   * Set all event listeners for draggable element
   * https://developer.mozilla.org/en-US/docs/Web/API/DragEvent#Event_types
   */
  function initDraggable(draggable) {
    draggable.addEventListener("dragstart", dragStartHandler);
    draggable.addEventListener("drag", dragHandler);
    draggable.addEventListener("dragend", dragEndHandler);

    // set draggable elements to draggable
    draggable.setAttribute("draggable", "true");
  }

  /**
   * Set all event listeners for drop zone
   * https://developer.mozilla.org/en-US/docs/Web/API/DragEvent#Event_types
   */
  function initDropZone(dropZone) {
    dropZone.addEventListener("dragenter", dropZoneEnterHandler);
    dropZone.addEventListener("dragover", dropZoneOverHandler);
    dropZone.addEventListener("dragleave", dropZoneLeaveHandler);
    dropZone.addEventListener("drop", dropZoneDropHandler);
  }

  /**
   * Start of drag operation, highlight drop zones and mark dragged element
   * The drag feedback image will be generated after this function
   * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragfeedback
   */
  function dragStartHandler(e) {
    setDropZonesHighlight();
    this.classList.add('dragged', 'drag-feedback');
    e.dataTransfer.setData("type/dragged-box", 'dragged');
    e.dataTransfer.setData("text/plain", this.textContent.trim());
    deferredOriginChanges(this, 'drag-feedback');
    console.log("-----", e)
    pickedFrom = e.path && e.path[1].id;
  }

  /**
   * While dragging is active we can do something
   */
  function dragHandler(e) {
    // do something... if you want
  }

  /**
   * Very last step of the drag operation, remove all added highlights and others
   */
  function dragEndHandler(e) {
    setDropZonesHighlight(false);
    this.classList.remove('dragged');
    console.log("pickedFrom: " + pickedFrom + ", droppedAt: " + droppedAt);
    const pickedFromIndex = parseInt(pickedFrom.slice(4), 10);
    const droppedAtIndex = parseInt(droppedAt.slice(4), 10);
    props.setNewSlide(prev => {
      const newSlides = [...prev];
      const temp = newSlides[pickedFromIndex];
      newSlides[pickedFromIndex] = newSlides[droppedAtIndex];
      newSlides[droppedAtIndex] = temp;
      return newSlides
    })
    pickedFrom = ""
    droppedAt = ""
  } 
  /**
   * When entering a drop zone check if it should be allowed to
   * drop an element here and highlight the zone if needed
   */
  function dropZoneEnterHandler(e) {
    console.log("------", e.dataTransfer.types.includes('type/dragged-box'), this)
    if (e.dataTransfer.types.includes('type/dragged-box')) {
      this.classList.add("over-zone");
      e.preventDefault();
    }
  }

  /**
   * When moving inside a drop zone we can check if it should be
   * still allowed to drop an element here
   */
  function dropZoneOverHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
      e.preventDefault();
    }
  }

  /**
   * When we leave a drop zone we check if we should remove the highlight
   */
  function dropZoneLeaveHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') &&
      e.relatedTarget !== null &&
      e.currentTarget !== e.relatedTarget.closest('.drop-zone')) {
      this.classList.remove("over-zone");
    }
  }

  /**
   * On successful drop event, move the element
   */
  function dropZoneDropHandler(e) {
    if (e.path) {
      if (/drag/.test(e.path[0].id)) droppedAt = e.path[0].id
      if (/drag/.test(e.path[2].id)) droppedAt = e.path[2].id
      if (/drag/.test(e.path[3].id)) droppedAt = e.path[3].id
    }
  }

  /**
   * Highlight all drop zones or remove highlight
   */
  function setDropZonesHighlight(highlight = true) {
    const dropZones = document.querySelectorAll(".drop-zone");
    for (const dropZone of dropZones) {
      if (highlight) {
        dropZone.classList.add("active-zone");
      } else {
        dropZone.classList.remove("active-zone");
        dropZone.classList.remove("over-zone");
      }
    }
  }

  /**
   * After the drag feedback image has been generated we can remove the class we added
   * for the image generation and/or change the originally dragged element
   * https://javascript.info/settimeout-setinterval#zero-delay-settimeout
   */
  function deferredOriginChanges(origin, dragFeedbackClassName) {
    origin.classList.remove(dragFeedbackClassName);
    setTimeout(() => {
    });
  }

  return (
    <div key={props.id + "" + Math.random()}
      id={"drag" + props.id}
      className={dropZoneClasses}>
      <div className={draggableClasses}>{props.children}</div>
    </div>
  );
};
export default VanillaDragDrop;

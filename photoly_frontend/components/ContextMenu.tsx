import * as React from 'react';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Portal, Menu, MenuButton, PortalProps, MenuButtonProps, MenuProps } from '@chakra-ui/react';

export interface ContextMenuProps<T extends HTMLElement> {
  renderMenu: () => JSX.Element | null;
  children: (ref: MutableRefObject<T | null>) => JSX.Element | null;
  menuProps?: MenuProps;
  portalProps?: PortalProps;
  menuButtonProps?: MenuButtonProps;
  stopPropagation?: boolean
}

export function ContextMenu<T extends HTMLElement = HTMLElement>(props: ContextMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isDeferredOpen, setIsDeferredOpen] = useState(false);
  const [position, setPosition] = useState([0, 0]);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    // console.log(props, "isOpen" + isOpen, "isRendered" + isRendered, "isDef" + isDeferredOpen)
    if (isOpen) {
      setTimeout(() => {
        setIsRendered(true);
        setTimeout(() => {
          setIsDeferredOpen(true);
        });
      });
    } else {
      setIsDeferredOpen(false);
      const timeout = setTimeout(() => {
        setIsRendered(isOpen);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleContextMenu = (e: any) => {
    if (targetRef.current?.contains(e.target as any) || e.target === targetRef.current) {
      
      e.preventDefault();
      if (props.stopPropagation) {
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
      
      setIsOpen(true);
      setPosition([e.pageX, e.pageY]);
    } else {
      setIsOpen(false);
    }
  }

  

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  const onCloseHandler = useCallback(() => {
    props.menuProps?.onClose?.();
    setIsOpen(false);
  }, [props.menuProps?.onClose, setIsOpen]);

  const handleClick = (event:any) => {
    if (event.type === "click" || event.type === "contextmenu") {
      event.preventDefault();
      setIsDeferredOpen(false)
    }else {
        event.preventDefault();
    }
  }

  return (
    <>
      {props.children(targetRef)}
      {isRendered && (
        <Portal {...props.portalProps}>
          <Menu isOpen={isDeferredOpen} gutter={0} {...props.menuProps} onClose={onCloseHandler}> 
            <MenuButton
              aria-hidden={true}
              w={1}
              h={1}
              style={{
                position: 'absolute',
                left: position[0],
                top: position[1],
                cursor: 'default',
              }}
              {...props.menuButtonProps}
              
            />
            {props.renderMenu()}
          </Menu>
        </Portal>
      )}
      {isDeferredOpen ? (<div style={{"zIndex": "999", "position": "fixed", "inset": "0px", "backgroundColor": "transparent" }} onContextMenu={handleClick}>
        
        </div>) : ("")}
    </>
  );
}
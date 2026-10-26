import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (domRef.current) {
          observer.unobserve(domRef.current);
        }
      }
    }, options);

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [domRef, isVisible];
}

/**
 * Declarative ScrollReveal Component
 * Usage: <ScrollReveal animation="fade-up" delay={200}> ... </ScrollReveal>
 */
export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  as: Component = 'div',
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal();

  let animationClass = 'scroll-reveal';
  if (animation === 'fade-left') animationClass = 'scroll-reveal-left';
  if (animation === 'fade-right') animationClass = 'scroll-reveal-right';
  if (animation === 'scale') animationClass = 'scroll-reveal-scale';

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Component
      ref={ref}
      className={`${animationClass} ${isVisible ? 'is-revealed' : ''} ${className}`}
      style={delayStyle}
      {...rest}
    >
      {children}
    </Component>
  );
}

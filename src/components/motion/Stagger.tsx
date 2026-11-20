"use client";

import React from "react";
import { m } from "motion/react";
import { useReducedMotion } from "motion/react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
}

/** Wraps a group of StaggerItem children with staggered entrance. */
export function Stagger({ children, className }: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/** Individual item inside a Stagger container. */
export function StaggerItem({ children, className, as: Tag = "div" }: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{children as any}</Tag>;
  }

  return (
    <m.div variants={staggerItem} className={cn(className)}>
      {children}
    </m.div>
  );
}

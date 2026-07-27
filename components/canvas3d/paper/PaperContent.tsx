"use client";

import React from "react";
import { getFontFamily } from "@/lib/canvas3d/fonts";
import type { Canvas3DElement } from "@/lib/canvas3d/types";
import {
  isImageElement,
  isShapeElement,
  isTextElement,
} from "@/lib/canvas3d/types";

interface PaperContentProps {
  element: Canvas3DElement;
}

export function PaperContent({ element }: PaperContentProps) {
  if (isShapeElement(element)) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: element.fillColor,
          borderRadius: element.borderRadius ?? 0,
          opacity: element.opacity ?? 1,
        }}
      />
    );
  }

  if (isImageElement(element)) {
    const radius =
      element.shape === "circle"
        ? "50%"
        : element.shape === "rounded"
          ? element.borderRadius ?? 16
          : 0;

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius,
          overflow: "hidden",
          background: element.src ? undefined : "#e5e7eb",
          opacity: element.opacity ?? 1,
        }}
      >
        {element.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={element.src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: element.objectFit,
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
              fontSize: 12,
            }}
          >
            Image
          </div>
        )}
      </div>
    );
  }

  if (isTextElement(element)) {
    const fontFamily = getFontFamily(element.fontId);
    const textStyle: React.CSSProperties = {
      fontFamily,
      fontSize: element.fontSize,
      color: element.color,
      fontWeight: element.fontWeight,
      textAlign: element.align,
      lineHeight: element.lineHeight ?? 1.4,
      width: "100%",
    };

    if (element.variant === "header") {
      return (
        <div style={{ ...textStyle, fontSize: element.fontSize || 28 }}>
          {element.content || "Header"}
        </div>
      );
    }

    if (element.variant === "sectionTitle") {
      return (
        <div
          style={{
            ...textStyle,
            fontWeight: "bold",
            borderBottom: "2px solid currentColor",
            paddingBottom: 4,
            display: "inline-block",
            width: "100%",
          }}
        >
          {element.content || "Section"}
        </div>
      );
    }

    if (element.variant === "subtitle") {
      return (
        <div
          style={{
            ...textStyle,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          {element.content || "Subtitle"}
        </div>
      );
    }

    if (element.variant === "labelValue") {
      return (
        <div style={{ width: "100%" }}>
          <div
            style={{
              ...textStyle,
              fontSize: element.fontSize * 0.85,
              opacity: 0.75,
            }}
          >
            {element.label || "Label"}
          </div>
          <div style={{ ...textStyle, fontWeight: 600 }}>
            {element.content || "—"}
          </div>
        </div>
      );
    }

    if (element.variant === "link") {
      return (
        <a
          href={element.href || "#"}
          style={{
            ...textStyle,
            textDecoration: "underline",
            color: element.color,
          }}
          onClick={(e) => e.preventDefault()}
        >
          {element.content || "Link"}
          {element.href ? " ↗" : ""}
        </a>
      );
    }

    if (element.variant === "withIcon") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: "100%",
          }}
        >
          <span style={{ fontSize: element.fontSize + 4 }}>
            {element.icon || "★"}
          </span>
          <span style={textStyle}>{element.content}</span>
        </div>
      );
    }

    if (element.variant === "withImage") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: "100%",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              overflow: "hidden",
              flexShrink: 0,
              background: "#e5e7eb",
            }}
          >
            {element.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={element.imageSrc}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : null}
          </div>
          <span style={textStyle}>{element.content}</span>
        </div>
      );
    }

    if (element.variant === "numbered" && element.listItems?.length) {
      return (
        <ol
          style={{
            ...textStyle,
            margin: 0,
            paddingLeft: 22,
          }}
        >
          {element.listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    }

    if (element.variant === "bulleted" && element.listItems?.length) {
      return (
        <ul
          style={{
            ...textStyle,
            margin: 0,
            paddingLeft: 22,
          }}
        >
          {element.listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <div style={{ ...textStyle, whiteSpace: "pre-wrap" }}>
        {element.content}
      </div>
    );
  }

  return null;
}

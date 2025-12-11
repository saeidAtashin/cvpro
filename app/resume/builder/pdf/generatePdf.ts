import { Document, Page, View, Text, Image, StyleSheet, pdf } from '@react-pdf/renderer';
import { ResumeElement } from '@/lib/types/ResumeElement';

const A4_WIDTH = 210; // mm
const A4_HEIGHT = 297; // mm
const MM_TO_PX = 3.779527559;

// Convert canvas pixels to PDF mm
const pxToMm = (px: number) => px / MM_TO_PX;

const styles = StyleSheet.create({
  page: {
    width: `${A4_WIDTH}mm`,
    height: `${A4_HEIGHT}mm`,
    padding: 0,
  },
  element: {
    position: 'absolute',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  divider: {
    height: 2,
    backgroundColor: '#000000',
  },
  image: {
    objectFit: 'cover',
  },
});

export const generatePdf = async (elements: ResumeElement[]): Promise<Blob> => {
  const pdfDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {elements.map((element) => {
          const elementStyle = {
            left: `${pxToMm(element.x)}mm`,
            top: `${pxToMm(element.y)}mm`,
            width: `${pxToMm(element.width)}mm`,
            height: `${pxToMm(element.height)}mm`,
            ...(element.rotation && { transform: `rotate(${element.rotation}deg)` }),
          };

          switch (element.type) {
            case 'heading':
              return (
                <View key={element.id} style={[styles.element, elementStyle]}>
                  <Text
                    style={[
                      styles.heading,
                      {
                        fontSize: element.fontSize || 24,
                        fontFamily: element.fontFamily || 'Helvetica',
                        color: element.color || '#000000',
                        fontWeight: element.fontWeight === 'bold' ? 'bold' : 'normal',
                        fontStyle: element.fontStyle === 'italic' ? 'italic' : 'normal',
                        lineHeight: element.lineHeight || 1.5,
                      },
                    ]}
                  >
                    {element.text || 'Heading'}
                  </Text>
                </View>
              );

            case 'text':
              return (
                <View key={element.id} style={[styles.element, elementStyle]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: element.fontSize || 14,
                        fontFamily: element.fontFamily || 'Helvetica',
                        color: element.color || '#000000',
                        fontWeight: element.fontWeight === 'bold' ? 'bold' : 'normal',
                        fontStyle: element.fontStyle === 'italic' ? 'italic' : 'normal',
                        lineHeight: element.lineHeight || 1.5,
                      },
                    ]}
                  >
                    {element.text || 'Text'}
                  </Text>
                </View>
              );

            case 'image':
              return element.src ? (
                <Image
                  key={element.id}
                  src={element.src}
                  style={[
                    styles.element,
                    styles.image,
                    elementStyle,
                    {
                      opacity: element.opacity !== undefined ? element.opacity : 1,
                      borderRadius: element.borderRadius || 0,
                    },
                  ]}
                />
              ) : null;

            case 'divider':
              return (
                <View
                  key={element.id}
                  style={[
                    styles.element,
                    styles.divider,
                    elementStyle,
                    {
                      backgroundColor: element.color || '#000000',
                      opacity: element.opacity !== undefined ? element.opacity : 1,
                    },
                  ]}
                />
              );

            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );

  const blob = await pdf(pdfDoc).toBlob();
  return blob;
};


import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CVData } from "@/lib/types";

// Register fonts if needed
// Font.register({
//   family: 'Roboto',
//   src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf',
// });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #000000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000000",
  },
  contactInfo: {
    fontSize: 9,
    color: "#333333",
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
    borderBottom: "1 solid #cccccc",
    paddingBottom: 3,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#333333",
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  company: {
    fontSize: 11,
    color: "#333333",
    fontStyle: "italic",
  },
  dateLocation: {
    fontSize: 9,
    color: "#666666",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#333333",
    marginTop: 4,
  },
  achievement: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#333333",
    marginLeft: 10,
    marginTop: 2,
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000000",
  },
  institution: {
    fontSize: 10,
    color: "#333333",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  skillItem: {
    fontSize: 10,
    marginRight: 10,
    marginBottom: 5,
    padding: "3 8",
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
  },
  languageItem: {
    fontSize: 10,
    marginBottom: 3,
  },
  certificationItem: {
    fontSize: 10,
    marginBottom: 3,
    color: "#333333",
  },
});

interface CVTemplateProps {
  data: CVData;
}

export const CVTemplate: React.FC<CVTemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    education,
    experience,
    skills,
    languages,
    certifications,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo.address && (
              <Text style={styles.contactItem}>
                {personalInfo.address}, {personalInfo.city},{" "}
                {personalInfo.country}
              </Text>
            )}
            {personalInfo.linkedin && (
              <Text style={styles.contactItem}>
                LinkedIn: {personalInfo.linkedin}
              </Text>
            )}
            {personalInfo.website && (
              <Text style={styles.contactItem}>
                Website: {personalInfo.website}
              </Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateLocation}>
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    <Text style={styles.dateLocation}>{exp.location}</Text>
                  </View>
                </View>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    {exp.achievements.map((achievement, idx) => (
                      <Text key={idx} style={styles.achievement}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>
                  {edu.institution} - {edu.location}
                </Text>
                <Text style={styles.dateLocation}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name} ({skill.level})
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languages.map((lang) => (
              <Text key={lang.id} style={styles.languageItem}>
                {lang.name} - {lang.level}
              </Text>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certifications.map((cert, idx) => (
              <Text key={idx} style={styles.certificationItem}>
                • {cert}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

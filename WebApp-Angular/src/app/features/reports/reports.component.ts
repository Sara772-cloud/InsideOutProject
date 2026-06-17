import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ParentList } from '../../core/models/parent-list.interface';
import { ChildrenList } from '../../core/models/children-list.interface';
import { GeneralService } from '../../core/services/general.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import jsPDF from 'jspdf';

export interface ReportResponse {
  childName: string;
  motherNote: string;
  summary: string;
  body: string;
}

@Component({
  selector: 'app-reports',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {

  Parents: ParentList[] = [];
  selectedParent: ParentList | null = null;
  selectedChild: ChildrenList | null = null;
  readonly specialistId: string = localStorage.getItem('userId') ?? '';

  isGenerating: boolean = false;
  generatedReport: ReportResponse | null = null;
  reportError: string = '';

  showEmailModal: boolean = false;
  isSending: boolean = false;
  sendSuccess: string = '';
  sendError: string = '';

  private readonly generalService = inject(GeneralService);
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'https://clambake-fanning-java.ngrok-free.dev/api';

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.generalService.getGeneralData(this.specialistId).subscribe({
      next: (res) => { this.Parents = res; },
      error: (err) => { console.error(err); }
    });
  }

  generateReport(): void {
    if (!this.selectedChild) {
      this.reportError = 'Please select a child first.';
      return;
    }
    this.isGenerating = true;
    this.generatedReport = null;
    this.reportError = '';

    this.http.post<ReportResponse>(
      `${this.BASE_URL}/Assessment/generate-report/${this.selectedChild.id}`, {}
    ).subscribe({
      next: (res) => { this.generatedReport = res; this.isGenerating = false; },
      error: (err) => {
        console.error(err);
        this.reportError = 'Failed to generate report. Please try again.';
        this.isGenerating = false;
      }
    });
  }

  // ── عمل PDF من الـ report data ────────────────────────────────
  private generatePdfBase64(): string {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const report = this.generatedReport!;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    // ── Header bar ───────────────────────────────────────────
    doc.setFillColor(124, 58, 237);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Child Progress Report', pageWidth / 2, 19, { align: 'center' });

    let y = 45;

    // ── Child Name ───────────────────────────────────────────
    doc.setTextColor(124, 58, 237);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(report.childName, margin, y);
    y += 8;

    // ── Divider ──────────────────────────────────────────────
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // ── Mother Note ──────────────────────────────────────────
    if (report.motherNote) {
      doc.setFillColor(243, 240, 255);
      doc.setDrawColor(124, 58, 237);
      doc.setLineWidth(0.3);

      const motherLines = doc.splitTextToSize(report.motherNote, contentWidth - 10);
      const motherBoxH = motherLines.length * 6 + 14;
      doc.roundedRect(margin, y, contentWidth, motherBoxH, 3, 3, 'FD');

      doc.setTextColor(124, 58, 237);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('MOTHER NOTE', margin + 5, y + 7);

      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(motherLines, margin + 5, y + 14);
      y += motherBoxH + 10;
    }

    // ── Summary ──────────────────────────────────────────────
    doc.setFillColor(243, 240, 255);
    doc.setDrawColor(124, 58, 237);
    const summaryLines = doc.splitTextToSize(report.summary, contentWidth - 10);
    const summaryBoxH = summaryLines.length * 6 + 14;
    doc.roundedRect(margin, y, contentWidth, summaryBoxH, 3, 3, 'FD');

    doc.setTextColor(124, 58, 237);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('AI SUMMARY', margin + 5, y + 7);

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(summaryLines, margin + 5, y + 14);
    y += summaryBoxH + 10;

    // ── Full Report ──────────────────────────────────────────
    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(200, 200, 200);
    const bodyLines = doc.splitTextToSize(report.body, contentWidth - 10);
    const bodyBoxH = bodyLines.length * 6 + 14;

    // لو محتاج page جديدة
    if (y + bodyBoxH > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      y = 20;
    }

    doc.roundedRect(margin, y, contentWidth, bodyBoxH, 3, 3, 'FD');

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('FULL REPORT', margin + 5, y + 7);

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(bodyLines, margin + 5, y + 14);
    y += bodyBoxH + 15;

    // ── Footer ───────────────────────────────────────────────
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const specialistName = 'Dr. ' + (localStorage.getItem('userName') ?? 'Specialist');
    doc.text(`Generated by ${specialistName}`, margin, pageHeight - 13);
    doc.text(new Date().toLocaleDateString(), pageWidth - margin, pageHeight - 13, { align: 'right' });

    return doc.output('datauristring').split(',')[1];
  }

  openApproveModal(): void {
    this.showEmailModal = true;
    this.sendSuccess = '';
    this.sendError = '';
  }

  closeModal(): void {
    this.showEmailModal = false;
  }

  sendReport(): void {
    if (!this.generatedReport || !this.selectedParent) return;

    this.isSending = true;
    this.sendError = '';
    this.sendSuccess = '';

    const pdfBase64 = this.generatePdfBase64();
    const parentEmail = this.selectedParent.email;
    const specialistName = 'Dr. ' + (localStorage.getItem('userName') ?? 'Specialist');

    emailjs.send(
      'service_5mcubwp',
      'template_klij4yl',
      {
        to_email        : parentEmail,
        child_name      : this.generatedReport.childName,
        summary         : this.generatedReport.summary,
        report_body     : this.generatedReport.body,
        specialist_name : specialistName,
        name            : specialistName,
        email           : parentEmail,
      },
      '29w7LWihpxP5D7A7_'
    ).then(() => {
      this.sendSuccess = `Report sent to ${parentEmail} successfully!`;
      this.isSending = false;
      setTimeout(() => { this.showEmailModal = false; this.sendSuccess = ''; }, 2500);
    }).catch((err) => {
      console.error(err);
      this.sendError = 'Failed to send report. Please try again.';
      this.isSending = false;
    });
  }

  resetReport(): void {
    this.generatedReport = null;
    this.reportError = '';
  }
}
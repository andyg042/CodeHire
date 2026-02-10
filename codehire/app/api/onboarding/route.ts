import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    console.log("Session in onboarding route:", session);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const body = await req.json();

    await prisma.userProfile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        major: body.major,
        graduationMonth: body.graduationMonth,
        graduationYear: body.graduationYear,
        skills: body.skills ?? [],
        codingLanguages: body.codingLanguages ?? [],
        jobLevels: body.jobLevels ?? [],
        employmentTypes: body.employmentTypes ?? [],
        workModes: body.workModes ?? [],
        preferredLocations: body.preferredLocations ?? [],
        companyStages: body.companyStages ?? [],
        jobRoles: body.jobRoles ?? [],
        industries: body.industries ?? [],
        minimumPay: body.minimumPay,
        payPeriod: body.payPeriod,
        resumeUrl: body.resumeUrl,
        jobStatus: body.jobStatus,
      },
      create: {
        userId: session.user.id,
        major: body.major,
        graduationMonth: body.graduationMonth,
        graduationYear: body.graduationYear,
        skills: body.skills ?? [],
        codingLanguages: body.codingLanguages ?? [],
        jobLevels: body.jobLevels ?? [],
        employmentTypes: body.employmentTypes ?? [],
        workModes: body.workModes ?? [],
        preferredLocations: body.preferredLocations ?? [],
        companyStages: body.companyStages ?? [],
        jobRoles: body.jobRoles ?? [],
        industries: body.industries ?? [],
        minimumPay: body.minimumPay,
        payPeriod: body.payPeriod,
        resumeUrl: body.resumeUrl,
        jobStatus: body.jobStatus,
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { JobLevel, EmploymentType, WorkMode, CompanyStage, PayPeriod } from "@prisma/client";

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
    console.log("Received body:", body);

    // Validate and transform employmentTypes to enum array
    const employmentTypesArray: EmploymentType[] = (body.employmentTypes || [])
      .map((type: string) => {
        const upperType = type.toUpperCase();
        if (Object.values(EmploymentType).includes(upperType as EmploymentType)) {
          return upperType as EmploymentType;
        }
        return null;
      })
      .filter(Boolean)

    // Validate and transform workModes to enum array
    const workModesArray: WorkMode[] = (body.workModes || [])
      .map((mode: string) => {
        const upperMode = mode.toUpperCase();
        if (Object.values(WorkMode).includes(upperMode as WorkMode)) {
          return upperMode as WorkMode;
        }
        return null;
      })
      .filter(Boolean);

    // Validate and transform companyStages to enum array
    const companyStagesArray: CompanyStage[] = (body.companyStages || [])
      .map((stage: string) => {
        // CompanyStage enum values in schema: Early_Stage, Startups, Public_Tech, Faang
        if (Object.values(CompanyStage).includes(stage as CompanyStage)) {
          return stage as CompanyStage;
        }
        return null;
      })
      .filter(Boolean);

    // Validate and transform jobLevels to enum array
    const jobLevelsArray: JobLevel[] = (body.jobLevels || [])
      .map((level: string) => {
        const upperLevel = level.toUpperCase();
        if (Object.values(JobLevel).includes(upperLevel as JobLevel)) {
          return upperLevel as JobLevel;
        }
        return null;
      })
      .filter(Boolean);

    // Validate payPeriod
    let payPeriodValue: PayPeriod | null = null;
    if (body.payPeriod) {
      const upperPayPeriod = body.payPeriod.toUpperCase();
      if (Object.values(PayPeriod).includes(upperPayPeriod as PayPeriod)) {
        payPeriodValue = upperPayPeriod as PayPeriod;
      }
    }

    // Build the profile data
    const profileData = {
      major: body.major || null,
      graduationMonth: body.graduationMonth || null,
      graduationYear: body.graduationYear ? parseInt(body.graduationYear, 10) : null,
      skills: Array.isArray(body.skills) ? body.skills : [],
      codingLanguages: Array.isArray(body.codingLanguages) ? body.codingLanguages : [],
      jobLevels: jobLevelsArray,
      employmentTypes: employmentTypesArray,
      workModes: workModesArray,
      preferredLocations: Array.isArray(body.preferredLocations) ? body.preferredLocations : [],
      companyStages: companyStagesArray,
      jobRoles: Array.isArray(body.jobRoles) ? body.jobRoles : [],
      industries: Array.isArray(body.industries) ? body.industries : [],
      minimumPay: body.minimumPay ? parseInt(body.minimumPay, 10) : null,
      payPeriod: payPeriodValue,
      resumeUrl: body.resumeUrl || null
    };

    console.log("Transformed profile data:", profileData);

    // Upsert the user profile
    await prisma.userProfile.upsert({
      where: {
        userId: session.user.id,
      },
      update: profileData,
      create: {
        userId: session.user.id,
        ...profileData,
      },
    });

    // Update user's onboarding status and name
    await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        onboardingCompleted: true,
        firstName: body.name?.split(' ')[0] || null,
        lastName: body.name?.split(' ').slice(1).join(' ') || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding error:", error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
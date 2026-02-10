import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { JobLevel, EmploymentType, WorkMode, CompanyStage } from "@prisma/client";

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

    // Transform job preferences object to enum array
    const employmentTypesArray: EmploymentType[] = [];
    if (body.jobPreferences?.fullTime) employmentTypesArray.push(EmploymentType.FULL_TIME);
    if (body.jobPreferences?.partTime) employmentTypesArray.push(EmploymentType.PART_TIME);
    if (body.jobPreferences?.contract) employmentTypesArray.push(EmploymentType.CONTRACT);
    if (body.jobPreferences?.internship || body.jobPreferences?.coOp) {
      // Map internship/co-op to TEMPORARY or you can add these to your enum
      employmentTypesArray.push(EmploymentType.TEMPORARY);
    }

    // Transform work locations object to enum array
    const workModesArray: WorkMode[] = [];
    if (body.workLocations?.remote) workModesArray.push(WorkMode.REMOTE);
    if (body.workLocations?.hybrid) workModesArray.push(WorkMode.HYBRID);
    if (body.workLocations?.inPerson) workModesArray.push(WorkMode.IN_PERSON);

    // Transform company stages object to enum array
    const companyStageMap: Record<string, CompanyStage> = {
      startup: CompanyStage.Startups,
      earlyStage: CompanyStage.Early_Stage,
      publicTech: CompanyStage.Public_Tech,
      faang: CompanyStage.Faang,
    };

    const companyStagesArray = Object.entries(body.companyStages || {})
      .filter(([_, value]) => value === true)
      .map(([key]) => companyStageMap[key])
      .filter(Boolean);

    // Transform industries object to string array
    const industriesArray = Object.entries(body.industries || {})
      .filter(([_, value]) => value === true)
      .map(([key]) => {
        // Convert camelCase to Title Case with spaces
        return key.replace(/([A-Z])/g, ' $1').trim();
      });

    // Map experience level to JobLevel enum
    const jobLevelMap: Record<string, JobLevel> = {
      entry: JobLevel.JUNIOR,
      mid: JobLevel.MID,
      senior: JobLevel.SENIOR,
      lead: JobLevel.LEAD,
    };

    const jobLevelsArray = body.experienceLevel 
      ? [jobLevelMap[body.experienceLevel] || JobLevel.JUNIOR]
      : [];

    // Build the profile data
    const profileData = {
      major: body.major || null,
      graduationMonth: body.graduationMonth || null,
      graduationYear: body.graduationYear ? parseInt(body.graduationYear, 10) : null,
      skills: body.skills ?? [],
      codingLanguages: body.codingLanguages ?? [],
      jobLevels: jobLevelsArray,
      employmentTypes: employmentTypesArray,
      workModes: workModesArray,
      preferredLocations: body.location ? [body.location] : [],
      companyStages: companyStagesArray,
      jobRoles: body.jobTitles ?? [],
      industries: industriesArray,
      minimumPay: body.pay ? parseInt(body.pay, 10) : null,
      payPeriod: body.payPeriod?.toUpperCase() as any, // Convert 'hourly' to 'HOURLY'
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
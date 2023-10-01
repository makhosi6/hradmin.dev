
export async function HEAD(request: Request) {
  const params = new URL(request.url).searchParams;
  const validateEmailParams: ValidateEmailReqParams = {
    email: params.get("email"),
  };
  if(!validateEmailParams.email){
   return Response.json(null, {status: 400})
  }
  return (validateEmailParams.email == '90') ?  Response.json(null, {status: 404}) : Response.json(null, {status: 200})
}
#include<iostream>
#include<fstream>
#include<cmath>
#include<time.h>
#include<cstdlib>

using namespace std;

int nk,n;
int H[3792][5056];

int main()
{
  srand(time(NULL));

  int i,j,p,q,sum,x,z,r,f,flag,c,m,ec;
  int dv=0,dc=0,k;
  int itrlim=50,nsim=1000;
  float prob_interval=0.05;
  int spn=(1.0/prob_interval);//success probab no.
  float succpro[spn]={0};


  ifstream infile;

int ch,chl;
  cout<<"1.Product Code"<<endl;
  cout<<"2.LDPC Code"<<endl;
  cout<<"Enter Your Choice:"<<endl;
  cin>>ch;

if(ch==1)
{

cout<<"enter no. of message bits:"<<endl;
cin>>k;
  x=sqrt(k);

  n=k+1+2*x;
  nk=n-k;
  dv=2;
  dc=x+1;
}

else
{

  cout<<"1.Hmatrix1"<<endl;
  cout<<"2.Hmatrix2"<<endl;
  cout<<"3.Hmatrix3"<<endl;
  cout<<"Enter Your Choice:"<<endl;
  cin>>chl;





}


//making H matrices
if(chl==1)
{
    nk=9;
    n=12;
int H1[nk][n]={

            {1,0,0,0,0,1,0,1,0,1,0,0},
            {1,0,0,1,1,0,0,0,0,0,1,0},
            {0,1,0,0,1,0,1,0,1,0,0,0},
            {0,0,1,0,0,1,0,0,0,0,1,1},
            {0,0,1,0,0,0,1,1,0,0,0,1},
            {0,1,0,0,1,0,0,0,1,0,1,0},
            {1,0,0,1,0,0,1,0,0,1,0,0},
            {0,1,0,0,0,1,0,1,0,1,0,0},
            {0,0,1,1,0,0,0,0,1,0,0,1}
         };

    for(i=0;i<nk;i++)
    for(j=0;j<n;j++)
    H[i][j]=H1[i][j];

}
else if(ch==1)
{
    //parity check matrix

for(i=0;i<n;i++)
H[0][i]=0;



p=j=0;
q=k;

for(i=0;i<x;i++)
{
   p=p+x;
  for(;j<p;j++)
     H[i][j]=1;

H[i][q]=1;
q++;
}

p=-1;
for(;i<2*x;i++)
{   p++;
  for(j=p;j<k&&q<n;j+=x)
   H[i][j]=1;

H[i][q]=1;
q++;
}

for(j=k;j<k+x;j++)//last
H[i][j]=1;
H[i][q]=1;

cout<<"Parity Check Matrix"<<endl;
for(i=0;i<nk;i++)
{
    cout<<endl;
    for(j=0;j<n;j++)
        cout<<H[i][j]<<"  ";
}


}
else if(chl==2 || chl==3)
{

    if(chl==2)
    {
        infile.open("H1.txt");
        nk=3792;
        n=5056;
    }
    else
    {
        infile.open("H2.txt");
        nk=3000;
        n=5000;
    }


    if(!infile)
    {
        cout<<"error finding file"<<endl;
        system("pause");
        exit(-1);
    }
    int cn=0;
    i=0;
    j=0;

    while(!infile.eof())
    {

        char ch;
        infile>>ch;



        if(ch=='1')
        {

        H[i][j]=1;
        j++;
        }
        else if(ch=='0')
           {

            H[i][j]=0;
            j++;
           }

    if(ch=='0' || ch=='1')
     cn++;

     if(cn==n+1)
        cn=1;




     if(cn==n)
     {
         i++;
         j=0;
     }
     if(i==nk)
        i--;

    }


}






//finding dv and dc;

dv=0;
dc=0;
for(i=0;i<nk;i++)
  {

    if(H[i][0]==1)
        dv++;

  }
   for(i=0;i<n;i++)
  {
    if(H[0][i]==1)
        dc++;
  }


int code[n]={0};
int codeori[n]={0};
int codeerr[n];


if(ch==1)
{

//making of Gmatrix
int G[n][k]={0};
for(i=0;i<k;i++)
G[0][i]=0;


j=0;
for(i=0;i<k;i++)
 {

    G[i][i]=1;
 }

j=p=0;
for(;i<k+x;i++)
{
   p=p+x;
  for(;j<p;j++)
     G[i][j]=1;
}

p=-1;

for(;i<n-1;i++)
{   p++;
  for(j=p;j+x<k;j+=x)
    G[i][j]=G[i][j+x]=1;
}

for(j=0;j<k;j++)
G[i][j]=1;


cout<<endl<<"Generator Matrix"<<endl;
for(i=0;i<n;i++)
{
    cout<<endl;
    for(j=0;j<k;j++)
        cout<<G[i][j]<<"  ";
}

cout<<endl;




int msg[k];
for(i=0;i<k;i++)
msg[i]=rand()%2;


for(i=0;i<n;i++)
for(j=0;j<k;j++)
code[i]=code[i]+G[i][j]*msg[j];

for(i=0;i<n;i++)
code[i]=codeori[i]=code[i]%2;


cout<<"encoded"<<endl;
for(i=0;i<n;i++)
cout<<code[i]<<"  ";

}






//channel
cout<<"n:"<<n<<"    dc:"<<dc<<"    dv:"<<dv<<endl;
float flip,probab;
int select;
cout<<"channel type:"<<"1-bsc  2-bec"<<endl;
cin>>select;

cout<<"Enter probability"<<endl;
cin>>probab;

cout<<"channel probability"<<"      decoding success"<<endl;

int alphao[n][dv+1];
  for(i=0;i<n;i++)
  for(j=0;j<dv+1;j++)
  alphao[i][j]=-7;


  int alphan[n][dv+1];
for(i=0;i<n;i++)
for(j=0;j<dv+1;j++)
alphan[i][j]=-7;


int betapos[nk][dc];
int betao[nk][dc];//beta old
int betan[nk][dc];// beta new
int bitlies[dv];

//betaposition
int a;

for(i=0;i<nk;i++)
{
    a=-1;
for(j=0;j<n;j++)
{
if(H[i][j]==1)
{
    a++;
   betapos[i][a]=j;
}

}
}



for(int sp=0;probab<1;sp++,probab+=prob_interval)
{
     int successful[nsim]={0};
for(int nsi=0;nsi<nsim;nsi++)
{


    for(i=0;i<n;i++)
    code[i]=codeori[i];

for(i=0;i<n;i++)
for(j=0;j<dv+1;j++)
alphan[i][j]=-7;

for(i=0;i<n;i++)
    {

     flip=(float)(rand()%100)/100;
     if(flip<probab)
     {
         if(select==1)
      code[i]=(code[i]+1)%2;
         else
          code[i]=-1;  //taking -1 as erased bit
       }
    }

//code[2]=code[6]=code[0]=code[7]=-1;
//code[9]=code[8]=-1;

for(i=0;i<n;i++)
codeerr[i]=code[i];



//initializing alpha
for(i=0;i<n;i++)
    alphao[i][0]=alphan[i][0]=code[i];






//beta initialization
for(i=0;i<nk;i++)
   for(j=0;j<dc;j++)
    betao[i][j]=betan[i][j]=code[betapos[i][j]];




for(m=0;m<itrlim;m++)
{

  for(z=0;z<n;z++)
  {
      //bitlies
      p=-1;
      for(i=0;i<nk;i++)
      {

          for(j=0;j<dc;j++)
          {
              if(betapos[i][j]==z)
              {
                  p++;
                  bitlies[p]=i;
                  if(p<dc-1)
                    bitlies[p+1]=-7;

              }
          }
      }

//updating alpha

        p=0;
    for(i=bitlies[p],c=1;c<dv+1;c++)
      {
        if(i==-7)
         break;

        sum=0;
        int cer=0;//erasures in check node
        for(j=0;j<dc;j++)
        if(betao[i][j]==-1 && betapos[i][j]!=z)
        cer++;

            if(cer>0)
              {
                  alphan[z][c]=-1;
                  goto q;
              }

        for(j=0;j<dc;j++)
        {
                if(betapos[i][j]!=z )
                sum=sum+betao[i][j];
            else
                continue;
        }
         alphan[z][c]=(sum)%2;
        q: p++;
         i=bitlies[p];



      }




//updating code
    flag=0;
    sum=0;
    int ce=0;



          for(j=0;j<dv+1;j++)
        {
            if(alphan[z][j]==-1 || alphan[z][j]==-7)
                ce++;
        }

        if(ce!=dv+1)
     {
            for(j=0;j<dv+1;j++)
              {
            if(alphan[z][j]!=-1 && alphan[z][j]!=-7)
                sum=sum+alphan[z][j];
             }

          if(sum>((float)((dv+1)-ce)/2.0) && code[z]!=1)
         {
          code[z]=1;
          flag=1;
             }
            else if(sum<((float)((dv+1)-ce)/2.0) && code[z]!=0)
            {
          code[z]=0;
          flag=1;
            }

         }










    ec=0;
    for(j=0;j<n;j++)
        if(code[j]==-1)
          ec=1;//ec= channel is erasure channel
    if(ec==0 || m==itrlim-1)
    {


         f=1;
         for(i=0;i<n;i++)
        {
            if(code[i]!=codeori[i])
            {
                f=0;
                break;
            }
        }
         if(f==1)
            goto h;


      }



            //updating beta

  p=1,r=0;
  for(i=bitlies[r];i!=-7 &&r<dv;)
  {



      for(j=0;j<dc;j++)//gives value of j in which z lies for an i;
        if(betapos[i][j]==z)
           break;



       int ea=0;//error in alpha
        for(x=0;x<dv+1;x++)
        {  if(x!=p)
          {
            if(alphao[z][x]==-1 || alphao[z][x]==-7)
            ea++;
          }
        }

  if(ea!=dv)
      {

          sum=0;
      for(x=0;x<dv+1;x++)
      {
          if(x!=p && alphao[z][x]!=-1 &&alphao[z][x]!=-7)
            sum=sum+alphao[z][x];
      }

         if(sum>((float)(dv-ea)/2.0))
        betan[i][j]=1;
        else
        betan[i][j]=0;

      }
      r++;
      p++;
      i=bitlies[r];

  }




  }






for(i=0;i<nk;i++)
for(j=0;j<dc;j++)
betao[i][j]=betan[i][j];

for(i=0;i<n;i++)
for(j=1;j<dv+1;j++)
alphao[i][j]=alphan[i][j];



}


h:
successful[nsi]=f;
}


sum=0;
for(i=0;i<nsim;i++)
sum=sum+successful[i];
succpro[sp]=(float)(sum)/nsim;

cout<<probab<<"                                           "<<succpro[sp]<<endl;
}




infile.close();


}






